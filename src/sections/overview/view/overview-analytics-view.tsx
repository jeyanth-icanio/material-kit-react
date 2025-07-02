import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';

import RecentBuildsWidget from 'src/components/widgets/RecentBuildsWidget';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
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
                title: 'Alpha',
                description: 'Main CI/CD pipeline for core product.',
              },
              {
                title: 'Beta',
                description: 'Staging environment deployment pipeline.',
              },
              {
                title: 'Gamma',
                description: 'Automated E2E testing pipeline.',
              },
              {
                title: 'Delta',
                description: 'Legacy system migration pipeline.',
              },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsOrderTimeline
            title="Project Timeline"
            list={[
              {
                color: 'primary',
                title: 'Project Alpha created',
                time: '2024-07-01 10:00',
              },
              {
                color: 'success',
                title: 'Project Beta edited',
                time: '2024-07-01 09:30',
              },
              {
                color: 'info',
                title: 'Project Gamma created',
                time: '2024-06-30 18:00',
              },
              {
                color: 'warning',
                title: 'Project Delta created',
                time: '2024-06-29 15:00',
              },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsTrafficBySite title="Traffic by site" list={_traffic} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <RecentBuildsWidget />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
