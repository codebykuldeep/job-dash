import { screen, waitFor } from "@testing-library/react";

import { renderWithProviders } from "../utils-tests/store-wrapper";
import AuthPage from "../components/Common/AuthPage/AuthPage";
import userEvent from "@testing-library/user-event";

describe("AUTH PAGE TEST CASES", () => {


  test("renders login component`", async () => {
    renderWithProviders(<AuthPage />);
    const loginElement = screen.getByRole("button", { name: /login/i });
    expect(loginElement).toBeInTheDocument();
  });



  test("renders Register page on click `here`", async () => {
    renderWithProviders(<AuthPage />);
    
    userEvent.click(screen.getByRole("button", { name: /here/i }));

    await waitFor(() => {
      const registerElement = screen.getByRole("button", { name: /register/i })
      expect(registerElement).toBeInTheDocument();
    });
  });
});
