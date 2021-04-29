// Tools and plugins
import { render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom';
import i18n from '@/plugins/i18n/index.js';

// Component
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('Renders Home page', () => {
    // Arrange
    const text = 'KPI management';
    render(Home, {
      global: {
        plugins: [i18n],
      },
    });

    // Assert
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('Contains cards to travel through app views', async () => {
    // Arrange
    render(Home, {
      global: {
        plugins: [i18n],
      },
    });

    // Assert
    expect(screen.getByRole('navigate-to-actives')).toBeInTheDocument();
  });
});
