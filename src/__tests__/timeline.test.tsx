import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TimelineForm from '@ui/molecules/timelineForm';
import dictionary from '@/dictionary/en.json';

describe('TimelineExampleTemplate', () => {
  it('should render TimelineExampleTemplate', () => {
    const mockSetFormData = vitest.fn();

    render(<TimelineForm setFormData={mockSetFormData} />);
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  it('should display error message when chainName is empty', async () => {
    const mockSetFormData = vitest.fn();

    render(<TimelineForm setFormData={mockSetFormData} />);
    const chainNameInput: HTMLInputElement = screen.getByTestId('chainNameInput');

    fireEvent.change(chainNameInput, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.getByText(dictionary.chainNameRequired)).toBeInTheDocument();
    });
  });
});
