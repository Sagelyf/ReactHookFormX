import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';

// Sample form component using react-hook-form
function SampleForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = data => console.log(data);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { required: 'Email is required' })}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input
        {...register('password', { required: 'Password is required' })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}

describe('SampleForm', () => {

  // Test if form renders correctly
  test('should render form with input fields', () => {
    render(<SampleForm />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  // Test form validation errors
  test('should show validation error if email is not provided', () => {
    render(<SampleForm />);
    
    fireEvent.submit(screen.getByRole('button'));
    
    const emailError = screen.getByText('Email is required');
    expect(emailError).toBeInTheDocument();
  });

  // Test successful form submission
  test('should submit form data when valid', () => {
    render(<SampleForm />);
    
    fireEvent.input(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.input(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    
    fireEvent.submit(screen.getByRole('button'));
    
    expect(screen.queryByText('Email is required')).toBeNull();
    expect(screen.queryByText('Password is required')).toBeNull();
  });

  // Test form shows password error when left empty
  test('should show password validation error', () => {
    render(<SampleForm />);
    
    fireEvent.submit(screen.getByRole('button'));
    
    const passwordError = screen.getByText('Password is required');
    expect(passwordError).toBeInTheDocument();
  });

});
