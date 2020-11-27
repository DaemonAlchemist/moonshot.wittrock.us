MoonShot ToDo
=============
Update game logic
    - Crash handling:  If rocket is closer to a non-target planet than it's radius, crash and end game
    - Win handling:  If rocket is closer to target planet than the target orbit (1.2 radius)
        - Calculate delta-V needed to enter target orbit
        - Add up total delta-V values (user-defined and final delta-V) to get score
        - Show upload to high score list modal

Update UX
    - Add player name input
    - Add high score list component
    - Add load from high score list control

Extra UX
    - Add rewind feature
    - When not near a burn, face rocket in direction of travel
    - Add ship travel dots
        - when viewport is tracking a planet, dot locations should be relative to the planet's location at that time.

Bugs
    - Make sure orbits are reasonable
    - w orbit parameter does not appear to be working (scale?)
    - Burn duration needs tweaking

Backend
    - Setup dynamoDB tables to record high scores
    - Setup API for high score CRUD:
        - .../moonshot/{levelId} [GET | POST]
            - POST should check validation code before uploading
            - POST should not allow identical high scores to be uploaded
        - .../moonshot/{levelId}/{scoreId} [GET]
    - Setup API for high score validation
        - Lambda function to run sim and validate results, and return an encrypted validation code

Dev Notes
=========
Need to link util directories between apps in order for the backend to work
/backend/src> mklink /J util "../../ui/src/util"