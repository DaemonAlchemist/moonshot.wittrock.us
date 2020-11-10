MoonShot ToDo
=============
Add start/target handling
    - Tweak level generation parameters
        - Planet sizes and orbit parameters
        - Moon sizes and orbit parameters
    - Pick a starting orbit
    - Pick a target (circular) orbit
    - Place rocket around starting planet in starting orbit
    - Track starting planet in "Start" viewport
    - Track target planet in "Target" viewport

Update game logic
    - Crash handling:  If rocket is closer to a planet than it's radius, crash and end game
    - Win handling:  If rocket is closer to target planet than the target orbit
        - Calculate delta-V needed to enter target orbit
        - Add up total delta-V values (user-defined and final delta-V) to get score
        - Show upload to high score list modal

Update UX
    - Add player name input
    - Add high score list component
    - Add load from high score list control
    - When not near a burn, face rocket in direction of travel

Bugs
    - Zoom broken when selecting a planet
    - Completely broken in Firefox

Backend
    - Setup dynamoDB tables to record high scores
    - Setup API for high score CRUD:
        - .../moonshot/{levelId} [GET | POST]
            - POST should check validation code before uploading
            - POST should not allow identical high scores to be uploaded
        - .../moonshot/{levelId}/{scoreId} [GET]
    - Setup API for high score validation
        - Lambda function to run sim and validate results, and return an encrypted validation code
