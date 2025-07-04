import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { _projects, _projectTasks } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import RecentBuildsWidget from 'src/components/widgets/RecentBuildsWidget';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsProjects } from '../analytics-projects';
import { AnalyticsProjectTasks } from '../analytics-project-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const handleLogoUpload = (projectId: string, file: File) => {
    // Handle logo upload logic here
    console.log('Uploading logo for project:', projectId, file);
    // You can implement actual file upload logic here
    // For now, we'll just log the action
  };

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Total Pipelines"
            percent={2.6}
            total={714000}
            icon={<img alt="Total Pipelines" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Active Builds"
            percent={-0.1}
            total={1352831}
            color="secondary"
            icon={<img alt="Active Builds" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Queued Jobs"
            percent={2.8}
            total={1723315}
            color="warning"
            icon={<img alt="Queued Jobs" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Failed Builds"
            percent={3.6}
            total={234}
            color="error"
            icon={<img alt="Failed Builds" src="/assets/icons/glass/ic-glass-message.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Projects"
            chart={{
              series: [
                { label: 'Project Alpha', value: 20 },
                { label: 'Project Beta', value: 15 },
                { label: 'Project Gamma', value: 10 },
                { label: 'Project Delta', value: 5 },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Project Build Results"
            subheader="Success vs Failure"
            chart={{
              categories: ['Alpha', 'Beta', 'Gamma', 'Delta'],
              series: [
                { name: 'Success', data: [18, 12, 8, 3] },
                { name: 'Failure', data: [2, 3, 2, 2] },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsConversionRates
            title="Project Commit Count"
            subheader="Current vs Last Month"
            chart={{
              categories: ['Alpha', 'Beta', 'Gamma', 'Delta'],
              series: [
                { name: 'Current Month', data: [120, 90, 60, 30] },
                { name: 'Last Month', data: [100, 80, 70, 40] },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentSubject
            title="Project Commit Difference"
            chart={{
              categories: ['Alpha', 'Beta', 'Gamma', 'Delta'],
              series: [
                { name: 'Commit Difference', data: [20, 10, -10, -10] },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsNews
            title="Projects"
            list={[
              {
                id: 'alpha',
                title: 'Alpha',
                coverUrl: '/assets/images/project-alpha.jpg',
                description: 'Main CI/CD pipeline for core product.',
                postedAt: '2024-07-01 10:00',
              },
              {
                id: 'beta',
                title: 'Beta',
                coverUrl: '/assets/images/project-beta.jpg',
                description: 'Staging environment deployment pipeline.',
                postedAt: '2024-07-01 09:30',
              },
              {
                id: 'gamma',
                title: 'Gamma',
                coverUrl: '/assets/images/project-gamma.jpg',
                description: 'Automated E2E testing pipeline.',
                postedAt: '2024-06-30 18:00',
              },
              {
                id: 'delta',
                title: 'Delta',
                coverUrl: '/assets/images/project-delta.jpg',
                description: 'Legacy system migration pipeline.',
                postedAt: '2024-06-29 15:00',
              },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrderTimeline
            title="Project Timeline"
            list={[
              {
                id: 'alpha-created',
                type: 'order1',
                title: 'Project Alpha created',
                time: '2024-07-01 10:00',
              },
              {
                id: 'beta-edited',
                type: 'order2',
                title: 'Project Beta edited',
                time: '2024-07-01 09:30',
              },
              {
                id: 'gamma-created',
                type: 'order3',
                title: 'Project Gamma created',
                time: '2024-06-30 18:00',
              },
              {
                id: 'delta-created',
                type: 'order4',
                title: 'Project Delta created',
                time: '2024-06-29 15:00',
              },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsProjects 
            title="Projects" 
            subheader="Click camera icon to upload logo"
            list={_projects}
            onLogoUpload={handleLogoUpload}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsProjectTasks 
            title="Project Tasks" 
            subheader="Filter by project"
            list={_projectTasks}
            projects={_projects}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <RecentBuildsWidget />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
