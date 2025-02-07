import { screen, waitFor } from "@testing-library/react";

import { renderWithProviders } from "../utils-tests/store-wrapper";
import Applications from "../components/User/Applications/Applications";

describe("USER DATA IN TABLE", () => {


  test("renders application data in table `", async () => {
    window.fetch =jest.fn().mockResolvedValueOnce({
        json:async() => DUMMY_APPLICATION_DATA
    })
    renderWithProviders(<Applications />);

    await waitFor( async()=>{
        const itemList = await screen.findAllByRole('checkbox',{}); // async
        expect(itemList).not.toHaveLength(0);
    })
    
  });

    test("checks no error in application data `", async () => {
        window.fetch =jest.fn().mockResolvedValueOnce({
            json:async() => DUMMY_APPLICATION_DATA
        })
        renderWithProviders(<Applications />);
        await waitFor(()=>{
            const errorElement = screen.getByText(/applications/i); // async
            expect(errorElement).toBeInTheDocument();
        })
    });

    test("checks error in failed application data `", async () => {
        window.fetch =jest.fn().mockResolvedValueOnce({
            json:async() => DUMMY_FAILED_APPLICATION_DATA
        })
        renderWithProviders(<Applications />);
        await waitFor(()=>{
            const errorElement = screen.queryAllByText(/error/i); // async
            expect(errorElement).not.toHaveLength(0);
        })
    });

});




const DUMMY_APPLICATION_DATA = JSON.parse(`{
    "status": 200,
    "data": [
        {
            "app_id": 32,
            "user_id": 8,
            "post_id": 7,
            "user_data": {
                "user_id": 8,
                "name": "Kuldeep",
                "email": "kuldeepcelestial@gmail.com",
                "summary": "looking for tech role  and others",
                "phone": "1234567890",
                "education": "Graduate",
                "image": "https://res.cloudinary.com/dhnzclvra/image/upload/v1738326065/job-dashboard/w8llzzt5nahyroereqoh.jpg",
                "resume": "https://res.cloudinary.com/dhnzclvra/image/upload/v1738326076/job-dashboard/xxaq7o85qacx0f4rdvx9.pdf",
                "status": true,
                "created_at": "2025-01-31 12:19:45.393249+00",
                "skill": "JavaScript,TypeScript,Node.js",
                "experience": 2
            },
            "status": true,
            "created_at": "2025-01-27 05:30:46.627762+00",
            "company_name": "Dev Tech Company",
            "title": "QA Tester",
            "description": "Quality assurance (QA) testers play a critical role in delivering high quality, perfectly-functioning software and web applications to customers. They test and evaluate new and existing programs to identify and help remove bugs, glitches, and other user experience issues",
            "location": "banglore",
            "experience": 2,
            "job_type": "fulltime",
            "education": "Graduate",
            "emp_id": 1,
            "date": "2025-01-31",
            "applied_date": "2025-01-31 12:22:23.807441+00",
            "app_status": null
        },
        {
            "app_id": 31,
            "user_id": 8,
            "post_id": 15,
            "user_data": {
                "user_id": 8,
                "name": "Kuldeep",
                "email": "kuldeepcelestial@gmail.com",
                "summary": "looking for tech role  and others",
                "phone": "1234567890",
                "education": "Graduate",
                "image": "https://res.cloudinary.com/dhnzclvra/image/upload/v1738326065/job-dashboard/w8llzzt5nahyroereqoh.jpg",
                "resume": "https://res.cloudinary.com/dhnzclvra/image/upload/v1738326076/job-dashboard/xxaq7o85qacx0f4rdvx9.pdf",
                "status": true,
                "created_at": "2025-01-31 12:19:45.393249+00",
                "skill": "JavaScript,TypeScript,Node.js",
                "experience": 2
            },
            "status": true,
            "created_at": "2025-01-31 12:18:49.307535+00",
            "company_name": "Best it solutions",
            "title": "SDE L2",
            "description": "SDE POSITION FOR FULL TIME",
            "location": "Noida",
            "experience": 7,
            "job_type": "fulltime",
            "education": "Graduate",
            "emp_id": 6,
            "date": "2025-02-02",
            "applied_date": "2025-01-31 12:22:03.103358+00",
            "app_status": true
        }
    ],
    "success": true
}`);



const DUMMY_FAILED_APPLICATION_DATA = JSON.parse(`{
    "status": 500,
    "data": [],
    "success": false
}`);