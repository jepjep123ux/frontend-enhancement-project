# Project Title

Frontend Enhancement Using Git Branching

## Project Overview

Students will collaborate using Git by creating their own branches from a central repository. Each student will enhance the frontend of an existing website by adding new features, improving UI/UX, or optimizing design.

This project simulates real-world development workflows using version control.

## Learning Objectives

By the end of this project, students will be able to:

Use Git branching effectively
Apply frontend development skills (HTML, CSS, JavaScript)
Improve UI/UX design of an existing system
Perform pull requests and basic code reviews
Resolve merge conflicts (basic level)

### Project Requirements

#### Step 1: Clone the Repository

git clone <repo-url>
cd <repo-name>

#### Step 2: Create a New Branch

Each student must create their own branch using this format:

git checkout -b feature/<lastname>-frontend-enhancement

Example:

git checkout -b feature/donaire-ui-improvement

#### Step 3: Frontend Enhancements

##### Students must implement at least 3 improvements:

###### UI/UX Improvements (choose any)

Improve layout (spacing, alignment)
Add responsive design (mobile-friendly)
Enhance typography and colors
Add animations or transitions

###### Functional Enhancements

Add a new interactive component (e.g., modal, dropdown)
Improve navigation (navbar, sidebar)
Add form validation
Improve loading or feedback indicators

###### Optimization

Clean and organize code
Reduce redundant CSS/JS
Improve performance (basic)

#### Step 4: Commit Changes Properly

Students must follow proper commit messages:

git add .
git commit -m "feat: improved navbar responsiveness"

#### Step 5: Push Branch

git push origin feature/<branch-name>

#### Step 6: Create Pull Request

Submit a Pull Request (PR) to the main branch
Include:
Summary of changes
Screenshots (before & after)
List of features added

### Deliverables

Each student must submit:

#### GitHub Branch

#### Pull Request

#### Short Documentation (README update or separate file):

##### Features added

##### Tools used

##### Challenges encountered

### Grading Rubric (100 pts)

Criteria Points
Git Usage (branching, commits, PR) 25 pts
UI/UX Improvements 25 pts
Functionality Enhancements 20 pts
Code Quality & Organization 15 pts
Documentation 15 pts

### Rules & Guidelines

#### Do NOT push directly to main

#### Work only on your assigned branch

#### Keep commits meaningful (no "update file")

#### Avoid breaking existing functionality

#### Test before pushing

#### Bonus Challenges (Optional)

##### Dark mode toggle

##### API integration (e.g., weather, quotes)

##### Use a frontend framework (React, Vue – optional advanced)
