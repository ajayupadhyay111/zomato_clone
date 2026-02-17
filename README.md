Daily notes — 2026-02-16

- Files changed:
  - `services/auth/src/model/User.ts`: Added Mongoose `User` model with fields `name`, `email` (required, unique), `image`, `role` (default null). Timestamps enabled.

- What I did / why it matters:
  - Created a basic user schema for the auth service to store user identity and profile image.
  - Ensures unique emails for user lookup and onboarding.

- Quick next steps:
  - Add validation and tests for the model.
  - Hook model into auth controllers and routes (create/find users).

Original prompt:
"create a readme file in root and write what i did today you can see the changed file basically and make it short and keep only important things which help to remember. If i see after a week it should be clear in my mind and attach the prompt so after redefine"
