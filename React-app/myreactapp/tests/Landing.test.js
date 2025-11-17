import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; // ensures toBeInTheDocument works
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event"; 
import Landing from "../src/pages/Landing";
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Landing Page", () => {
  test("renders both Login and Register buttons and can click them", async () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    const registerButton = screen.getByRole("button", { name: /register/i });

    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();    
    
    await userEvent.click(loginButton);
    await userEvent.click(registerButton);

    await userEvent.click(loginButton);
    expect(mockedNavigate).toHaveBeenCalledWith("/login");
  
    await userEvent.click(registerButton);
    expect(mockedNavigate).toHaveBeenCalledWith("/register");
  });
});

