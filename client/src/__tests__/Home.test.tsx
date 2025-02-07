import { screen, waitFor } from '@testing-library/react';

import Home from '../components/Common/Home/Home';
import { renderWithProviders } from '../utils-tests/store-wrapper';
//import {  userActions } from '../store/userSlice';
//import { setupStore } from '../utils-tests/store-init';

import userEvent from "@testing-library/user-event";

describe('HOME PAGE TEST CASES',()=>{
    test('initialize "HomePage" with initialValue', () => {
        //with test values
        
        renderWithProviders(<Home />);
        const HomeElement = screen.getByText("Perfect Job");
        expect(HomeElement).toBeInTheDocument();
   });


   test('renders Login button on Home page',async()=>{
    
    renderWithProviders(<Home />);

    const btnElement = screen.getByRole("button", { name: /login/i });

    expect(btnElement).toBeInTheDocument();
    })


   test('render auth page on button click',async()=>{
        renderWithProviders(<Home/>);


        //const user = userEvent.setup();
        userEvent.click(screen.getByRole("button", { name: /login/i }));

        await waitFor(()=>{
            const loginElement = screen.getByText(/login/i);
            expect(loginElement).toBeInTheDocument();
        })
   })


})


export const DUMMY_USER = JSON.parse(`{
        "user_id": 8,
        "name": "ABCD USER",
        "email": "abcd@gmail.com",
        "summary": "looking for roles",
        "phone": "1234567890",
        "education": "Graduate",
        "image": "",
        "resume": "",
        "status": false,
        "created_at": "2025-01-31 12:19:45.393249+00",
        "skill": "JavaScript,TypeScript,Node.js",
        "experience": 0,
        "role": "user"
}`)
