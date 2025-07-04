import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Stack, TextField, Button, Divider, FormControl, InputLabel, Select, MenuItem, Stepper, Step, StepLabel } from '@mui/material';
import type { BuildConfig, ProjectForm } from './projects';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const defaultBuildConfig: BuildConfig = {
  buildBranch: '',
  buildScript: '',
  buildTrigger: 'push',
  artifacts: '',
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BuildsPage() {
  const [projects, setProjects] = useState<ProjectForm[]>([]);
  const [editingConfig, setEditingConfig] = useState<BuildConfig | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const query = useQuery();
  const navigate = useNavigate();
  const projectId = query.get('projectId');

  useEffect(() => {
    const saved = localStorage.getItem('projects');
    setProjects(saved ? JSON.parse(saved) : []);
  }, []);

  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    if (project) {
      setEditingConfig(project.buildConfig || defaultBuildConfig);
    }
  }, [project]);

  const handleChange = (field: keyof BuildConfig, value: string) => {
    setEditingConfig((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  const handleSave = () => {
    if (!project || !editingConfig) return;
    const updatedProjects = projects.map((p) =>
      p.id === project.id ? { ...p, buildConfig: editingConfig } : p
    );
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const steps = ['General', 'Steps', 'Triggers', 'Artifacts'];

  if (!projectId || !project) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Select a project to configure its build pipeline.</Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {projects.map((p) => (
            <Button key={p.id} variant="outlined" onClick={() => navigate(`/builds?projectId=${p.id}`)}>
              {p.name}
            </Button>
          ))}
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Configure Build: {project.name}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {editingConfig && (
        <>
          {activeStep === 0 && (
            <Stack spacing={2}>
              <TextField
                label="Build Branch"
                value={editingConfig.buildBranch}
                onChange={e => handleChange('buildBranch', e.target.value)}
                fullWidth
              />
            </Stack>
          )}
          {activeStep === 1 && (
            <Stack spacing={2}>
              <DragDropContext onDragEnd={result => {
                if (!result.destination) return;
                const jobs = Array.from(editingConfig.jobs);
                const [removed] = jobs.splice(result.source.index, 1);
                jobs.splice(result.destination.index, 0, removed);
                setEditingConfig(prev => prev ? { ...prev, jobs } : prev);
              }}>
                <Droppable droppableId="jobs">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {editingConfig.jobs.map((job, idx) => (
                        <Draggable key={idx} draggableId={String(idx)} index={idx}>
                          {(provided) => (
                            <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                              <Stack direction="row" spacing={2} alignItems="center">
                                <TextField
                                  label="Job Name"
                                  value={job.name}
                                  onChange={e => {
                                    const jobs = [...editingConfig.jobs];
                                    jobs[idx].name = e.target.value;
                                    setEditingConfig(prev => prev ? { ...prev, jobs } : prev);
                                  }}
                                  sx={{ flex: 1 }}
                                />
                                <Button color="error" onClick={() => {
                                  const jobs = editingConfig.jobs.filter((_, i) => i !== idx);
                                  setEditingConfig(prev => prev ? { ...prev, jobs } : prev);
                                }}>Delete</Button>
                              </Stack>
                              <TextField
                                label="Script"
                                value={job.script}
                                onChange={e => {
                                  const jobs = [...editingConfig.jobs];
                                  jobs[idx].script = e.target.value;
                                  setEditingConfig(prev => prev ? { ...prev, jobs } : prev);
                                }}
                                multiline
                                minRows={2}
                                fullWidth
                                placeholder="e.g. npm install && npm run build"
                                sx={{ mt: 1 }}
                              />
                              <TextField
                                label="Condition (optional)"
                                value={job.condition || ''}
                                onChange={e => {
                                  const jobs = [...editingConfig.jobs];
                                  jobs[idx].condition = e.target.value;
                                  setEditingConfig(prev => prev ? { ...prev, jobs } : prev);
                                }}
                                fullWidth
                                sx={{ mt: 1 }}
                              />
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <Button variant="outlined" onClick={() => setEditingConfig(prev => prev ? { ...prev, jobs: [...prev.jobs, { name: '', script: '' }] } : prev)}>
                Add Job
              </Button>
            </Stack>
          )}
          {activeStep === 2 && (
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Build Trigger</InputLabel>
                <Select
                  value={editingConfig.buildTrigger}
                  label="Build Trigger"
                  onChange={e => handleChange('buildTrigger', e.target.value)}
                >
                  <MenuItem value="push">On Push</MenuItem>
                  <MenuItem value="manual">Manual</MenuItem>
                  <MenuItem value="schedule">Scheduled</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          )}
          {activeStep === 3 && (
            <Stack spacing={2}>
              <TextField
                label="Artifacts (optional)"
                value={editingConfig.artifacts}
                onChange={e => handleChange('artifacts', e.target.value)}
                fullWidth
                placeholder="e.g. dist/, build/"
              />
            </Stack>
          )}
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((s) => s - 1)}
            >
              Back
            </Button>
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={() => setActiveStep((s) => s + 1)}>
                Next
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSave}>
                Save
              </Button>
            )}
            <Button variant="outlined" onClick={() => navigate('/builds')}>Cancel</Button>
          </Stack>
        </>
      )}
    </Box>
  );
} 