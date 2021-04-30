// Tools and plugins
import { render, screen, fireEvent } from '@testing-library/vue';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import i18n from '@/plugins/i18n/index.js';
import store from '@/store/index.js';

// Component
import FieldForm from '@/components/fields/FieldForm.vue';

// Setup mock data
describe('FieldForm.vue', () => {
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

  it('Renders form with empty inputs when id is not passed as prop (is a create form)', () => {
    // Arrange
    const text = 'Test title';
    render(FieldForm, {
      global: {
        plugins: [i18n, store],
      },
    });

    // Assert
    const inputFieldTitle = screen.queryByRole('input-field-title');

    expect(inputFieldTitle).toBeInTheDocument();
    expect(inputFieldTitle).not.toHaveAttribute('modelvalue', text);
  });

  it('Renders form with inputs with values when id is passed as prop (is an update form)', async () => {
    // Arrange
    const text = 'Test title';
    render(FieldForm, {
      props: {
        id: 1,
      },
      global: {
        plugins: [i18n, store],
      },
    });

    // Assert
    const inputFieldTitle = screen.queryByRole('input-field-title');
    expect(inputFieldTitle).toBeInTheDocument();

    expect(inputFieldTitle).toHaveAttribute('modelvalue', text);
  });

  it('In an update form, if we change input value it updates Field data', async () => {
    // Arrange
    const text = 'Test title';
    const changedText = 'Changed test title';

    render(FieldForm, {
      props: {
        id: 1,
      },
      global: {
        plugins: [i18n, store],
      },
    });

    // Assert
    const inputFieldTitle = screen.queryByRole('input-field-title');
    expect(inputFieldTitle).toBeInTheDocument();

    // Check for old value
    expect(inputFieldTitle).toHaveAttribute('modelvalue', text);

    // Change value
    inputFieldTitle.setAttribute('modelvalue', changedText);
    expect(inputFieldTitle).toHaveAttribute('modelvalue', changedText);
  });
});
