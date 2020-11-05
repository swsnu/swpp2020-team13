# swpp2020-team13
## Useful Google Links
Links updated in : [Notion Link](https://www.notion.so/Useful-Links-References-for-Implementation-149d5cb96b624b1b93e077a9485f4601)
## Development Status per Branch
Status also updated in : [Notion Link](https://www.notion.so/Development-Status-also-in-github-README-233da94c520d4839a63c56e2ea4b7d66)
### backend

1. Jiye-Backend-goalCRUD
    - [x]  Pulled from 'develop' branch
    - [x]  Implement GET/POST in '/goal'
    - [x]  Implement GET/PUT/DELETE in '/goal/<int:goal_id>'
    - [x]  Type casting among **datetime** ↔ **JSON**
    - [x]  Set timezone to Seoul
    - [x]  CRUD for tags in goal.model (taggableManager)
    - [ ]  Merge to 'develop' branch
    - [ ]  Merge to 'master' branch
    - [ ]  Later TODO : create 'categories'
    - [ ]  Later TODO : CRUD for 'categories'
    - [ ]  Later TODO : Slug datafield in goal.model (this will be implemented when developing goal-detail page)
    
2. Jiye-Backend-taskCRUD

### Frontend
1. Jiye-Frontend-semanticUI
    - [x]  Install semanticUI
    - [x]  Connected semanticUI with React
    - [x]  Add basics to App.js and Index.js
    
2. Jiye-Frontend-MenuBar
    - [x]  Create Menu Bar with Icons - Create / Main / Dashboard / Explore / Profile / Logout
    - [x]  Connect SemanticUI and set CSS
    - [x]  Add navigation properties by history.push
    
3. Jiye-Frontend-goalAndTaskReducer
    - [x]  Add goalReducer with actions as follows:
        - GET_ALL_GOAL
        - GET_GOAL
        - EDIT_GOAL
        - DELETE_GOAL
    - [ ]  Add taskReducer with actions as follows:
        - GET_ALL_TASK
        - GET_TASK
        - EDIT_TASK
        - DELETE_TASK
4. Jiye-Frontend-mainPage
    - CreateGoalComponent
      - [x]  Create Form Title
      - [x]  Create Form File Input
      - [x]  Create Form Date (with DatePicker)
      - [x]  Create From Tag (with addition-allowed/clearable/multiselection dropdown)
      - [ ]  Connect file input url with backend via axios & receive file URL
      - [ ]  Connect CreateGoalComponent with Redux
