// Tools and plugins
import { render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom';
import i18n from '@/plugins/i18n/index.js';
import store from '@/store/index.js';

// Component
import KpiForm from '@/components/kpis/KpiForm.vue';

// Setup mock data
describe('KpiForm.vue', () => {
  // Mock route and router
  const mockRoute = {
    params: {},
    query: {},
    path: '/kpis/',
  };
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
  };

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

  beforeEach(() => {
    store._state.data.kpis.kpis = mockKpis;

    // store.dispatch = jest.fn();
    // store.getters = {
    //   'fields/requiredFields': () =>
    //     mockKpi.fields.filter((field) => field.required),
    //   'fields/unrequiredFields': () =>
    //     mockKpi.fields.filter((field) => !field.required),
    //   'fields/fields': () => mockKpi.fields,
    // };
    // store.getters['fields/requiredFields'] = () => [];
    // store.getters['fields/unrequiredFields'] = () => [];
  });

  it('Renders form with empty inputs when id is not passed as prop (is a create form)', () => {
    // Arrange
    const inputRole = 'input-kpi-title';
    const text = 'KPI test title';

    mockRoute.path += 'create';

    render(KpiForm, {
      global: {
        plugins: [i18n, store],
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
          notify: jest.fn(),
        },
      },
    });

    // Assert
    const inputKpiTitle = screen.queryByRole(inputRole);

    expect(inputKpiTitle).toBeInTheDocument();
    expect(inputKpiTitle).not.toHaveAttribute('modelvalue', text);
    expect(inputKpiTitle).toHaveAttribute('modelvalue', '');
  });

  // it('Renders form with inputs with values when id is passed as prop (is an update or clone form)', async () => {
  //   // Arrange
  //   const inputRole = 'input-kpi-title';
  //   const text = 'KPI test title';

  //   mockRoute.path += '1/edit';
  //   mockRoute.params.id = 1;

  //   render(KpiForm, {
  //     props: { id: 1 },
  //     global: {
  //       plugins: [i18n, store],
  //       mocks: {
  //         $route: mockRoute,
  //         $router: mockRouter,
  //         notify: jest.fn(),
  //       },
  //     },
  //   });

  //   // Assert
  //   const inputKpiTitle = screen.getByRole(inputRole);

  //   expect(inputKpiTitle).toBeInTheDocument();
  //   expect(inputKpiTitle).toHaveAttribute('modelvalue', text);
  // });

  // it('If clone is present in path then we are in a clone form', async () => {
  //   // Arrange
  //   mockRoute.query.clone = '1'; // Change route query
  //   mockRoute.path += 'create';

  //   const formRole = 'submit-kpi-form';
  //   const inputRole = 'input-kpi-title';
  //   const text = 'KPI test title';

  //   render(KpiForm, {
  //     props: { id: 1 },
  //     global: {
  //       plugins: [i18n, store],
  //       mocks: {
  //         $route: mockRoute,
  //         $router: mockRouter,
  //       },
  //     },
  //   });

  //   // Assert
  //   const inputKpiTitle = screen.queryByRole(inputRole);
  //   const submitKpiForm = screen.queryByRole(formRole);

  //   expect(inputKpiTitle).toBeInTheDocument();
  //   expect(inputKpiTitle).toHaveAttribute('modelvalue', text);

  //   expect(submitKpiForm).toBeInTheDocument();
  //   expect(submitKpiForm.innerHTML).toMatch('1');
  // });
});
