import type { SelectChangeEvent } from '@mui/material/Select';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import BuildIcon from '@mui/icons-material/Build';
import PauseIcon from '@mui/icons-material/Pause';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import GitHubIcon from '@mui/icons-material/GitHub';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SettingsIcon from '@mui/icons-material/Settings';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormControlLabel from '@mui/material/FormControlLabel';

const PROJECT_TYPES = ['Web', 'API', 'Mobile', 'Library', 'Other'];
const INTEGRATIONS = [
  { label: 'Slack', value: 'slack' },
  { label: 'Email', value: 'email' },
  { label: 'Webhook', value: 'webhook' },
];

type EnvVar = { key: string; value: string };
export type BuildJob = {
  name: string;
  script: string;
  condition?: string;
};
export type BuildConfig = {
  buildBranch: string;
  buildTrigger: 'push' | 'manual' | 'schedule';
  artifacts: string;
  jobs: BuildJob[];
};
export type ProjectForm = {
  id: string;
  name: string;
  description: string;
  logo: File | string;
  repo: string;
  type: string;
  branch: string;
  env: EnvVar[];
  team: string;
  integrations: string[];
  visibility: string;
  cron: string;
  status: 'active' | 'paused' | 'error';
  lastBuild?: string;
  buildCount?: number;
  createdAt: string;
  buildConfig: BuildConfig;
};
type FormErrors = Partial<Record<keyof ProjectForm, string>>;

const defaultBuildConfig: BuildConfig = {
  buildBranch: '',
  buildTrigger: 'push',
  artifacts: '',
  jobs: [
    { name: 'Build', script: 'npm install && npm run build' },
  ],
};

export default function ProjectsPage() {
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectForm | null>(null);
  const [form, setForm] = useState<ProjectForm>({
    id: '',
    name: '',
    description: '',
    logo: '',
    repo: '',
    type: '',
    branch: '',
    env: [{ key: '', value: '' }],
    team: '',
    integrations: [],
    visibility: 'private',
    cron: '',
    status: 'active',
    createdAt: new Date().toISOString(),
    buildConfig: defaultBuildConfig,
  });
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [projects, setProjects] = useState<ProjectForm[]>(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : [];
  });
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectForm | null>(null);
  const [buildConfigOpen, setBuildConfigOpen] = useState(false);
  const [buildConfigProject, setBuildConfigProject] = useState<ProjectForm | null>(null);

  const navigate = useNavigate();

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const handleChange = (field: keyof ProjectForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    setForm((prev) => ({ ...prev, [field]: (e.target as HTMLInputElement).value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setLogoPreview(ev.target?.result as string || '');
      reader.readAsDataURL(file);
    }
  };

  const handleEnvChange = (idx: number, field: keyof EnvVar) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnv = [...form.env];
    newEnv[idx][field] = e.target.value;
    setForm((prev) => ({ ...prev, env: newEnv }));
  };

  const addEnv = () => setForm((prev) => ({ ...prev, env: [...prev.env, { key: '', value: '' }] }));
  const removeEnv = (idx: number) => setForm((prev) => ({ ...prev, env: prev.env.filter((_, i) => i !== idx) }));

  const handleIntegrations = (integration: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      const exists = prev.integrations.includes(integration);
      return {
        ...prev,
        integrations: exists
          ? prev.integrations.filter((i) => i !== integration)
          : [...prev.integrations, integration],
      };
    });
  };

  const handleVisibility = (e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, visibility: e.target.checked ? 'public' : 'private' }));

  const validate = () => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Project name is required';
    if (!form.repo.trim()) errs.repo = 'Repository URL is required';
    if (!form.type) errs.type = 'Project type is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resetForm = () => {
    setForm({
      id: '',
      name: '',
      description: '',
      logo: '',
      repo: '',
      type: '',
      branch: '',
      env: [{ key: '', value: '' }],
      team: '',
      integrations: [],
      visibility: 'private',
      cron: '',
      status: 'active',
      createdAt: new Date().toISOString(),
      buildConfig: defaultBuildConfig,
    });
    setLogoPreview('');
    setErrors({});
    setEditingProject(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (editingProject) {
      // Update existing project, exclude large logo data
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProject.id
            ? {
                ...form,
                logo: '', // Do not store base64 or file in localStorage
                env: form.env.filter(pair => pair.key || pair.value),
                lastBuild: project.lastBuild,
                buildCount: project.buildCount,
                createdAt: project.createdAt,
              }
            : project
        )
      );
    } else {
      // Add new project, exclude large logo data
      setProjects((prev) => [
        ...prev,
        {
          ...form,
          id: Date.now().toString(),
          logo: '', // Do not store base64 or file in localStorage
          env: form.env.filter(pair => pair.key || pair.value),
          lastBuild: undefined,
          buildCount: 0,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
    setOpen(false);
    resetForm();
  };

  const handleEdit = (project: ProjectForm) => {
    setEditingProject(project);
    setForm({
      ...project,
      logo: typeof project.logo === 'string' ? '' : project.logo,
    });
    setLogoPreview(typeof project.logo === 'string' ? project.logo : '');
    setOpen(true);
  };

  const handleDelete = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    setMenuAnchor(null);
    setSelectedProject(null);
  };

  const handleStatusToggle = (project: ProjectForm) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === project.id
          ? { ...p, status: p.status === 'active' ? 'paused' : 'active' }
          : p
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'paused': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <PlayArrowIcon />;
      case 'paused': return <PauseIcon />;
      case 'error': return <BuildIcon />;
      default: return <PlayArrowIcon />;
    }
  };

  const handleOpenBuildConfig = (project: ProjectForm) => {
    setBuildConfigProject(project);
    setBuildConfigOpen(true);
  };

  const handleCloseBuildConfig = () => {
    setBuildConfigOpen(false);
    setBuildConfigProject(null);
  };

  const handleSaveBuildConfig = (updatedConfig: BuildConfig) => {
    if (!buildConfigProject) return;
    setProjects(prev => prev.map(p => p.id === buildConfigProject.id ? { ...p, buildConfig: updatedConfig } : p));
    handleCloseBuildConfig();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Projects
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your CI/CD projects and pipelines
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          New Project
        </Button>
      </Stack>

      {/* Project List */}
      {projects.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No projects yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Create your first project to get started with CI/CD
          </Typography>
          <Button variant="outlined" onClick={() => setOpen(true)}>
            Create Project
          </Button>
        </Card>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          {projects.map((project) => (
            <Card key={project.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                  <Avatar
                    src={typeof project.logo === 'string' ? project.logo : ''}
                    alt={project.name}
                    sx={{ width: 48, height: 48 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Typography variant="h6" noWrap>
                        {project.name}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          setMenuAnchor(e.currentTarget);
                          setSelectedProject(project);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {project.description}
                    </Typography>
                    <Chip
                      label={project.type}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      icon={getStatusIcon(project.status)}
                      label={project.status}
                      color={getStatusColor(project.status) as any}
                      size="small"
                    />
                  </Box>
                </Stack>

                <Stack spacing={1} sx={{ mb: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <GitHubIcon fontSize="small" color="action" />
                    <Typography variant="body2" noWrap>
                      {project.repo.split('/').pop()}
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <VisibilityIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {project.visibility}
                    </Typography>
                  </Stack>

                  {project.cron && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <ScheduleIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {project.cron}
                      </Typography>
                    </Stack>
                  )}

                  {project.lastBuild && (
                    <Typography variant="body2" color="text.secondary">
                      Last build: {new Date(project.lastBuild).toLocaleDateString()}
                    </Typography>
                  )}

                  {project.buildCount !== undefined && (
                    <Typography variant="body2" color="text.secondary">
                      {project.buildCount} builds
                    </Typography>
                  )}
                </Stack>

                {project.integrations.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      Integrations:
                    </Typography>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                      {project.integrations.map((integration) => (
                        <Chip
                          key={integration}
                          label={integration}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Box>
                )}
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Stack direction="row" spacing={1}>
                  <Tooltip title={project.status === 'active' ? 'Pause Project' : 'Activate Project'}>
                    <IconButton
                      size="small"
                      onClick={() => handleStatusToggle(project)}
                      color={project.status === 'active' ? 'warning' : 'success'}
                    >
                      {project.status === 'active' ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Project Settings">
                    <IconButton size="small">
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
                
                <Button size="small" variant="outlined" onClick={() => navigate(`/builds?projectId=${project.id}`)}>
                  Configure Build
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      {/* Project Actions Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => {
          setMenuAnchor(null);
          setSelectedProject(null);
        }}
      >
        {selectedProject && (
          <>
            <MenuItem onClick={() => handleEdit(selectedProject)}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit Project</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleDelete(selectedProject.id)}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete Project</ListItemText>
            </MenuItem>
          </>
        )}
      </Menu>

      {/* Create/Edit Project Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProject ? 'Edit Project' : 'Create New Project'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Stack spacing={3}>
              <TextField
                label="Project Name"
                value={form.name}
                onChange={handleChange('name')}
                required
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
              />
              <TextField
                label="Description"
                value={form.description}
                onChange={handleChange('description')}
                multiline
                rows={2}
                fullWidth
              />
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={logoPreview} alt="Logo" sx={{ width: 56, height: 56 }} />
                <Button variant="outlined" component="label">
                  Upload Logo
                  <input type="file" accept="image/*" hidden onChange={handleLogoChange} />
                </Button>
              </Stack>
              <TextField
                label="Repository URL"
                value={form.repo}
                onChange={handleChange('repo')}
                required
                error={!!errors.repo}
                helperText={errors.repo}
                fullWidth
              />
              <FormControl fullWidth required error={!!errors.type}>
                <InputLabel>Project Type</InputLabel>
                <Select value={form.type} label="Project Type" onChange={handleChange('type')}>
                  {PROJECT_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
                <Typography variant="caption" color="error">{errors.type}</Typography>
              </FormControl>
              <TextField
                label="Default Branch"
                value={form.branch}
                onChange={handleChange('branch')}
                fullWidth
              />
              <Divider>Environment Variables</Divider>
              <Stack spacing={1}>
                {form.env.map((pair, idx) => (
                  <Stack direction="row" spacing={1} alignItems="center" key={idx}>
                    <TextField
                      label="Key"
                      value={pair.key}
                      onChange={handleEnvChange(idx, 'key')}
                      size="small"
                    />
                    <TextField
                      label="Value"
                      value={pair.value}
                      onChange={handleEnvChange(idx, 'value')}
                      size="small"
                    />
                    <IconButton onClick={() => removeEnv(idx)} disabled={form.env.length === 1}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                ))}
                <Button startIcon={<AddIcon />} onClick={addEnv} size="small">
                  Add Variable
                </Button>
              </Stack>
              <TextField
                label="Team/Owner"
                value={form.team}
                onChange={handleChange('team')}
                fullWidth
              />
              <FormGroup row>
                {INTEGRATIONS.map((integration) => (
                  <FormControlLabel
                    key={integration.value}
                    control={
                      <Checkbox
                        checked={form.integrations.includes(integration.value)}
                        onChange={handleIntegrations(integration.value)}
                      />
                    }
                    label={integration.label}
                  />
                ))}
              </FormGroup>
              <FormControlLabel
                control={<Switch checked={form.visibility === 'public'} onChange={handleVisibility} />}
                label={form.visibility === 'public' ? 'Public' : 'Private'}
              />
              <TextField
                label="Cron Job (optional)"
                value={form.cron}
                onChange={handleChange('cron')}
                fullWidth
                helperText="e.g. 0 2 * * * for nightly build"
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpen(false);
            resetForm();
          }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingProject ? 'Update Project' : 'Create Project'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Build Config Dialog */}
      <Dialog open={buildConfigOpen} onClose={handleCloseBuildConfig} maxWidth="sm" fullWidth>
        <DialogTitle>Configure Build - {buildConfigProject?.name}</DialogTitle>
        <DialogContent>
          {buildConfigProject && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Build Branch"
                value={buildConfigProject.buildConfig.buildBranch}
                onChange={e => setBuildConfigProject(prev => prev ? { ...prev, buildConfig: { ...prev.buildConfig, buildBranch: e.target.value } } : prev)}
                fullWidth
              />
              <TextField
                label="Build Script"
                value={buildConfigProject.buildConfig.buildScript}
                onChange={e => setBuildConfigProject(prev => prev ? { ...prev, buildConfig: { ...prev.buildConfig, buildScript: e.target.value } } : prev)}
                multiline
                minRows={2}
                fullWidth
                placeholder="e.g. npm install && npm run build"
              />
              <FormControl fullWidth>
                <InputLabel>Build Trigger</InputLabel>
                <Select
                  value={buildConfigProject.buildConfig.buildTrigger}
                  label="Build Trigger"
                  onChange={e => setBuildConfigProject(prev => prev ? { ...prev, buildConfig: { ...prev.buildConfig, buildTrigger: e.target.value as BuildConfig['buildTrigger'] } } : prev)}
                >
                  <MenuItem value="push">On Push</MenuItem>
                  <MenuItem value="manual">Manual</MenuItem>
                  <MenuItem value="schedule">Scheduled</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Artifacts (optional)"
                value={buildConfigProject.buildConfig.artifacts}
                onChange={e => setBuildConfigProject(prev => prev ? { ...prev, buildConfig: { ...prev.buildConfig, artifacts: e.target.value } } : prev)}
                fullWidth
                placeholder="e.g. dist/, build/"
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBuildConfig}>Cancel</Button>
          <Button variant="contained" onClick={() => buildConfigProject && handleSaveBuildConfig(buildConfigProject.buildConfig)}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 