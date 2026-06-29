import React from 'react';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const sendContactMock = vi.fn();

vi.mock('../services/api', () => ({
  sendContact: (...args) => sendContactMock(...args),
}));

import Contact from '../components/Contact';

let container;
let root;

const setNativeValue = (element, value) => {
  const { set } = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), 'value');
  set.call(element, value);
};

const changeValue = async (element, value) => {
  await act(async () => {
    setNativeValue(element, value);
    element.dispatchEvent(new Event('input', { bubbles: true }));
  });
};

const blurField = async (element) => {
  await act(async () => {
    element.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
  });
};

const submitForm = async (form) => {
  await act(async () => {
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await Promise.resolve();
  });
};

beforeEach(() => {
  sendContactMock.mockReset();

  class MockIntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }

    observe = (element) => {
      this.callback([{ isIntersecting: true, target: element }]);
    };

    disconnect = () => {};
    unobserve = () => {};
  }

  window.IntersectionObserver = MockIntersectionObserver;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => {
    root.unmount();
  });
  container.remove();
});

describe('Contact component', () => {
  it('shows validation errors for required fields', async () => {
    await act(async () => {
      root.render(<Contact />);
    });

    const form = container.querySelector('form');
    await submitForm(form);

    expect(container.textContent).toContain('Name is required');
    expect(container.textContent).toContain('Email is required');
    expect(container.textContent).toContain('Message is required');
  });

  it('submits valid data and shows success feedback', async () => {
    sendContactMock.mockResolvedValue({ data: { message: 'Message sent successfully!' } });

    await act(async () => {
      root.render(<Contact />);
    });

    const form = container.querySelector('form');
    const firstName = container.querySelector('#contact-name');
    const email = container.querySelector('#contact-email');
    const message = container.querySelector('#contact-message');

    await changeValue(firstName, 'Aditya');
    await blurField(firstName);
    await changeValue(email, 'aditya@example.com');
    await blurField(email);
    await changeValue(message, 'This is a valid portfolio message.');
    await blurField(message);
    await submitForm(form);

    expect(sendContactMock).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Aditya',
      email: 'aditya@example.com',
      message: 'This is a valid portfolio message.',
    }));
    expect(container.textContent).toContain('Message sent successfully!');
  });
});
