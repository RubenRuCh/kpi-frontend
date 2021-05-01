// Tools and plugins
import { render, screen, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';
import i18n from '@/plugins/i18n/index.js';
import store from '@/store/index.js';

// Component
import KpiItem from '@/components/kpis/KpiItem.vue';

// Setup mock data
describe('KpiItem.vue', () => {
  // Mock route and router
  const mockRoute = {
    params: {
      id: 1,
    },
    path: '/kpis/1',
  };
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    // Mock vuex state
    const mockKpis = [];

    const mockKpi = {
      id: 1,
      title: 'KPI test title',
      description: 'KPI test description',
      enabled: true,
      fields: [
        {
          id: 1,
          title: 'Field test title',
          description: 'Field test description',
          required: true,
          fillable: true,
          requiredText: 'Yes',
          fillableText: 'Yes',
          type: 'textarea',
          values: null,
          value: 'Field test value',
          maxlength: null,
        },
        {
          id: 2,
          title: 'Field test title 2',
          description: 'Field test description 2',
          required: false,
          fillable: false,
          requiredText: 'No',
          fillableText: 'No',
          type: 'radio',
          values: ['Option A', 'Option B'],
          value: 'Option A',
          maxlength: null,
        },
      ],
    };

    mockKpis.push(mockKpi);

    store._state.data.kpis.kpis = mockKpis;
  });

  it('Renders kpi data when id is passed as prop and kpi exist in vuex', () => {
    // Arrange
    const text = 'KPI test title';
    render(KpiItem, {
      props: { id: 1 },
      global: {
        plugins: [i18n, store],
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    // Assert
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('If we are in kpi details view (register is not present in path) then show action buttons', async () => {
    // Arrange
    const role = 'show-kpi-registers';
    render(KpiItem, {
      props: { id: 1 },
      global: {
        plugins: [i18n, store],
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    // Assert
    expect(screen.queryByRole(role)).toBeInTheDocument();
  });

  it('If we are in kpi registers view (register is present in path) then do not show action buttons', async () => {
    // Arrange
    mockRoute.path = '/kpis/1/registers'; // Change route path

    const role = 'show-kpi-registers';
    render(KpiItem, {
      props: { id: 1 },
      global: {
        plugins: [i18n, store],
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
      },
    });

    // Assert
    expect(screen.queryByRole(role)).not.toBeInTheDocument();
  });
});
