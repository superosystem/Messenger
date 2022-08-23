# Task Agile - User Stories

## The user stories will be grouped into the following themes:
- `Users`: This contains all user-related stories.
- `Teams`: This contains all team-related stories.
- `Boards`: This contains all board-related stories.
- `Card` lists: This contains all card list-related stories.
- `Cards`: This contains all card-related stories.
## We will have the following user roles:
- `Visitor`: Anonymous visitors that the system does not recognize.
- `Registered` user: A user that has registered in the system.
- `Team creator`: A user who creates that team.
- `Board creator`: A user who creates that board.
- `Board member`: A user who is added to a board by the board creator.

### Users
The following are the user stories with the title of the Users theme:
- `Register` as a visitor, I want to register a user account with my email address, username, and password. The acceptance criteria is as follows:
  - The email address must not already exist in the system,
  - The username must not already exist in the system,
  - The password must be at least six characters,
  - The password must contain at least one number,
  - The password must contain at least one letter,
- `Log in` as a registered user, I can use my username or email address with the password to log into the application.
### Teams
The following are the user stories with the title of the Teams theme:
- `Create a team` as a registered user, I want to create teams so that I can organize tasks of different teams.
- `Change team name` as a team creator, I can change the name of the team that I created.
### Boards
The following are the user stories with the title of the Boards theme:
- `Create a personal board` as a registered user, I can create a personal board so that I can organize personal tasks.
- `Create a team board` as a registered user, I can add a board to a team so that I can organize the tasks of that team.
- `Add board member` as a board creator, I can add registered users to a board as board members so that they can access cards in the board.
- `View board activities` as a board member, I can view all activities within that board so that I can understand what happened.
### Card Lists
The following are the user stories with the title of the Card Lists theme:
- `Create a card list` as a board member, I can add card lists in a board so that I can arrange cards in that list.
- `Rename card list` as a board member, I can rename a card list.
- `Archive card list` as a board member, I can archive a card list in that board.
- `Change card list position` as a board member, I can change the position of a card list in that board.
- `View card list` as a board member, I can view the cards added to a card list in that board.
### Cards
The followings are the user stories with the title of the Cards theme:
- `Add card` as a board member, I can add cards to card lists in that board.
- `View card` as a board member, I can view the details of a card in that board.
- `Edit card title` as a board member, I can edit the title of a card in that board.
- `Edit card description` as a board member, I can edit the description of a card using plain text or markdown formatted text in that board.
- `Assign member to the card` as a board member, I can add board members to a card.
- `Change the card position` as a board member, I can rearrange cards by changing their positions in the same card list so that I can better prioritize them.
- `Move card` as a board member, I can move cards between card lists in that board.
- `Archive card` as a board member, I can archive a card in that board.
- `Delete card` as a board member, I can delete an archived card in that board.
- `Add card attachment` as a board member, I can attach an attachment to a card in that board.
- `Download card attachment` as a board member, I can download the attachments of a card in that board.
- `Delete card attachment` as a board member, I can delete card attachments of a card in that board.
- `Add card comment` as a board member, I can add comments to a card in that board. 
- `Edit card comment` as a board member, I can edit my own card comments in that board.
- `Delete card comment` as a board member, I can delete my own card comments in that board.
- `View card activities` as a board member, I'd like to view all the activities of a card so that I can track the history of that card.

<span align="right">

[Back to Home](https://github.com/gusrylmubarok/task-agile-web/blob/main/LICENSE.md)

</span>