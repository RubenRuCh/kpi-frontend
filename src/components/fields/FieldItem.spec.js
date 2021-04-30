// Tools and plugins
import { render, screen, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';
import i18n from '@/plugins/i18n/index.js';
import store from '@/store/index.js';

// Component
import FieldItem from '@/components/fields/FieldItem.vue';

// Setup mock data
describe('FieldItem.vue', () => {
  beforeEach(() => {
    const mockFields = [];

    const mockField = {
      id: 1,
      title: 'Test title',
      description: 'Test description',
      fillable: true,
      fillableText: 'Yes',
      required: true,
      requiredText: 'Yes',
      type: 'textarea',
      value: '',
      values: null,
    };

    mockFields.push(mockField);

    store._state.data.fields.fields = mockFields;
  });

  it('Renders field data when id is passed as prop and field exist in vuex', () => {
    // Arrange
    const text = 'Test title';
    render(FieldItem, {
      props: { id: 1 },
      global: {
        plugins: [i18n, store],
      },
    });

    // Assert
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('Contains button to travel to FieldModification view', async () => {
    // Arrange
    const mockRoute = {
      params: {
        id: 1,
      },
      path: 'fields/1',
    };
    const mockRouter = {
      push: jest.fn(),
    };

    render(FieldItem, {
      props: { id: 1 },
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
        plugins: [i18n, store],
      },
    });

    const modifyButton = screen.getByRole('navigate-to-modify-field');

    // Assert
    expect(modifyButton).toBeInTheDocument();

    await fireEvent(modifyButton, new Event('click'));
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('fields/1/edit');
  });
});
