### Develop an Angular/React application for a Human Resources department to streamline the employee Tasks by RKS Cloud
 
##### GitHub repo link: https://github.com/kirankuyate2157/HR-app
- Deployed app link (Server API, Client)
- https://kways-hr.vercel.app/   `Api integration in app in proegress `
- https://kways-hr.onrender.com/api/v1/healthcheck  `(health check route for health check before that API endpoint )`

### Tech Stack used
- MERN stack
-  In server-side AWS s3 for docs storage using presigned URLs (resumes/Cv, photos, pdf, etc.,)
-  Node mailer for mailing or notifications to applicants who applied for Job (Hiring status updates )
-  server-side pagination, filter, search 
-  other Ui and lib...

### use case
- HR (one admin persona can create an account for their org with his (Admin or root user) we create members who can also use Apps  and operate apps for their related data )
- can create Job (open and close job responses and other related operations with it 
- they can Share job links of application forms link from the student or job seekers can fill in data and apply for a jab
- the applied application will be available in-app in the employee tab (new application, our employee ) view data and profile add review and recommendations on his profile, and accordingly, mail notification will be sent to their mail
- In the Selection tab HR can select the application and start the Hiring process assign Tasks and update the Hiring status (rounds) up to offer later after acceptance of the offer letter via mail confirmation with a token 
- After acceptance application converted into an Employee profile 
- in employees, life cycle will be there (operation, experience, Role, appraisal, and more.. )
The app is Secure with some secure routes (JWT) and some public (like application form..)
