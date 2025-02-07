import { screen, waitFor } from "@testing-library/react";

import { renderWithProviders } from "../utils-tests/store-wrapper";
import UserHome from "../components/User/Home/UserHome";
//import { userActions } from "../store/userSlice";
import { DUMMY_USER } from "./Home.test";

describe("USER DATA IN TABLE", () => {
    test("checks no error in user home page on data `", async () => {
        
        window.fetch =jest.fn().mockResolvedValueOnce({
            json:async() => DUMMY_APPLICATION_DATA
        })
        renderWithProviders(<UserHome />,{preloadedState:{
            userSlice:{
                user:DUMMY_USER
            }
        }});
        await waitFor(()=>{
            const profileElement = screen.getByText(/profile/i); // async
            expect(profileElement).toBeInTheDocument();
        })
    });

  test("renders users data on User Home `", async () => {
    
    window.fetch =jest.fn().mockResolvedValueOnce({
        json:async() => DUMMY_APPLICATION_DATA
    })
    renderWithProviders(<UserHome />,{preloadedState:{
        userSlice:{
            user:DUMMY_USER
        }
    }});

    await waitFor( async()=>{
        const itemList = screen.getAllByText('2'); // async
        expect(itemList).not.toHaveLength(0);
    })
    
  });

    

    test("checks error in failed user Home `", async () => {
        
        window.fetch =jest.fn().mockResolvedValueOnce({
            json:async() => DUMMY_FAILED_APPLICATION_DATA
        })
        renderWithProviders(<UserHome />,{preloadedState:{
            userSlice:{
                user:DUMMY_USER
            }
        }});
        await waitFor(()=>{
            const errorElement = screen.queryAllByText(/error/i); // async
            expect(errorElement).not.toHaveLength(0);
        })
    });

});




const DUMMY_APPLICATION_DATA = JSON.parse(`{
    "status": 200,
    "data": {
        "appStatusData": [
            {
                "count": "1",
                "app_status": true
            },
            {
                "count": "1",
                "app_status": null
            }
        ],
        "companyData": [
            {
                "count": "1",
                "company_name": "Best it solutions"
            },
            {
                "count": "1",
                "company_name": "Dev Tech Company"
            }
        ]
    },
    "success": true
}`);



const DUMMY_FAILED_APPLICATION_DATA = JSON.parse(`{
    "status": 500,
    "data": [],
    "success": false
}`);