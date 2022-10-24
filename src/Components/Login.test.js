import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from './Login';

jest.mock("axios", () =>({
__esModules:true,
    default:{
        get: () => ({
            data:{id:1, name:"jayanth"}
        })
    }
}))


test("header inupt should render", () => {
    render(<Login />);
    const hederOne = screen.getByText(/login page/i);
    expect(hederOne).toBeInTheDocument();
});

test("username inupt should render", () => {
    render(<Login />);
    const userInput = screen.getByPlaceholderText(/username/i);
    expect(userInput).toBeInTheDocument();
});

test("password inupt should render", () => {
    render(<Login />);
    const passInput = screen.getByPlaceholderText(/password/i);
    expect(passInput).toBeInTheDocument();
});

test("button should render", () => {
    render(<Login />);
    const buttonEle = screen.getByRole('button');
    expect(buttonEle).toBeInTheDocument();
});

test("username inupt should be empty", () => {
    render(<Login />);
    const userInput = screen.getByPlaceholderText(/username/i);
    expect(userInput.value).toBe("");
});

test("password inupt should be empty", () => {
    render(<Login />);
    const passInput = screen.getByPlaceholderText(/password/i);
    expect(passInput.value).toBe("");
});

test("button should disabled", () => {
    render(<Login />);
    const buttonEle = screen.getByRole('button');
    expect(buttonEle).toBeDisabled();
});

test("loading should not be rendered", () => {
    render(<Login />);
    const buttonEle = screen.getByRole('button');
    expect(buttonEle).not.toHaveTextContent(/please wait.../i);
});

test("error message disabled initially", () => {
    render(<Login />);
    const Initalerror = screen.getByTestId('error');
    expect(Initalerror).not.toBeVisible();
});

test("username inupt should change", () => {
    render(<Login />);
    const userInput = screen.getByPlaceholderText(/username/i);
    const testValue = "Jayanth";
    fireEvent.change(userInput, { target: {value: testValue} })
    expect(userInput.value).toBe(testValue);
});

test("password inupt should change", () => {
    render(<Login />);
    const passInput = screen.getByPlaceholderText(/password/i);
    const testPass = "123456"
    fireEvent.change(passInput, { target: {value: testPass} })
    expect(passInput.value).toBe(testPass);
});

test("button should not be disabled when username & password entered", () => {
    render(<Login />);
    const buttonEle = screen.getByRole('button');
    const userInput = screen.getByPlaceholderText(/username/i);
    const passInput = screen.getByPlaceholderText(/password/i);

    const dummyValue = "jayanth"
    fireEvent.change(userInput, {target:{value: dummyValue}})
    fireEvent.change(passInput, {target:{value: dummyValue}})
    expect(buttonEle).not.toBeDisabled();
});

test("loading should  be rendered when clicked", () => {
    render(<Login />);
    const buttonEle = screen.getByRole('button');
    const userInput = screen.getByPlaceholderText(/username/i);
    const passInput = screen.getByPlaceholderText(/password/i);

    const dummyValue = "jayanth"

    fireEvent.change(userInput, {target: {value: dummyValue}})
    fireEvent.change(passInput, {target: {value: dummyValue}})
    fireEvent.click(buttonEle);
    expect(buttonEle).toHaveTextContent(/please wait.../i);
});

test("loading should not be rendered when clicked after fetching", async () => {
    render(<Login />);
    const buttonEle = screen.getByRole('button');
    const userInput = screen.getByPlaceholderText(/username/i);
    const passInput = screen.getByPlaceholderText(/password/i);

    const dummyValue = "jayanth"

    fireEvent.change(userInput, {target: {value: dummyValue}})
    fireEvent.change(passInput, {target: {value: dummyValue}})
    fireEvent.click(buttonEle);
    await  waitFor(() => expect(buttonEle).not.toHaveTextContent(/please wait.../i)
    );
});


test("loading should be rendered when clicked and get data", async () => {
    render(<Login />);
    const buttonEle = screen.getByRole('button');
    const userInput = screen.getByPlaceholderText(/username/i);
    const passInput = screen.getByPlaceholderText(/password/i);

    const dummyValue = "jayanth"

    fireEvent.change(userInput, {target: {value: dummyValue}})
    fireEvent.change(passInput, {target: {value: dummyValue}})
    fireEvent.click(buttonEle);

    const userItem = await screen.findByText("Jayanth")
  expect(userItem).toBeInTheDocument();
});