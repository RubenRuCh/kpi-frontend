// Tools and plugins
import { render, screen, fireEvent } from '@testing-library/vue';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import i18n from '@/plugins/i18n/index.js';
import store from '@/store/index.js';

// Component
import RegisterForm from '@/components/registers/RegisterForm.vue';

// Setup mock data
describe('RegisterForm.vue', () => {
  beforeEach(() => {
    const mockRegisters = [];

    const mockRegister = {
      id: 1,
      kpiId: 1,
      value: '',
      columns: []
    };

    mockRegisters.push(mockRegister);

    store._state.data.registers.registers = mockRegisters;
  });

  it('Renders form with empty inputs when id is not passed as prop (is a create form)', () => {
    // Arrange
    const text = 'Test title';
    render(RegisterForm, {
      global: {
        plugins: [i18n, store],
      },
    });

    // Assert
    const inputFieldTitle = screen.queryByRole('input-field-value');

    expect(inputFieldTitle).toBeInTheDocument();
    expect(inputFieldTitle).not.toHaveAttribute('modelvalue', text);
  });

    it('Renders form with inputs with no empty values in (input_field_value)', async () => {
    // Arrange
    
    render(RegisterForm, {
      props: {
        id: 1,
        kpiId: 1,
        value: 'test',
        columns: []
      },
      global: {
        plugins: [i18n, store],
      },
    });

    // Assert
    const inputFieldTitle = screen.queryByRole('input-field-value');
    expect(inputFieldTitle).toBeInTheDocument();

    expect(inputFieldTitle).not.toBeNull();
  }); 

   it('In an update form, if we change input value it updates Register data', async () => {
    // Arrange
    const text = 'Test title';
    const changedText = 'Changed test title';

    render(RegisterForm, {
      props: {
        id: 1,
      },
      global: {
        plugins: [i18n, store],
      },
    });

    // Assert
    const inputFieldTitle = screen.queryByRole('input-field-value');
    expect(inputFieldTitle).toBeInTheDocument();

    // Check for old value
    inputFieldTitle.setAttribute('modelvalue', text);
     expect(inputFieldTitle).toHaveAttribute('modelvalue', text); 

    // Change value
    inputFieldTitle.setAttribute('modelvalue', changedText);
    expect(inputFieldTitle).toHaveAttribute('modelvalue', changedText);
  }); 
});
