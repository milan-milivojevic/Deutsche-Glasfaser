import { async } from "@magnolia/react-editor/build/mgnl-react-editor";
import { getAPIBase } from "./AppHelpers";

export async function aclCheck(allowedGroups, deniedGroups, hideComponent) {
  const apiBase = getAPIBase();

  // const [userName, setUserName] = useState();
  // const [users, setUsers] = useState();

  // useEffect(() => {
  //   fetch("https://dg-test.brandmaker.com/rest/administration/users/_current")
  //     .then(response => response.json())
  //     .then(data => {
  //       setUserName(data);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch(`${apiBase}/.rest/delivery/users`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setUsers(data.results);
  //     });
  // }, [apiBase]);

  let currentUser = null;
  let users = null;

  async function fetchCurrentUser() {
    const response = await fetch(
      "https://dg-test.brandmaker.com/rest/administration/users/_current"
    );
    const data = await response.json();
    currentUser = data;
  }

  await fetchCurrentUser();

  async function fetchUsers() {
    const response = await fetch(`${apiBase}/.rest/delivery/users`);
    const data = await response.json();
    users = data.results;
  }

  await fetchUsers();

  return await checkACL(currentUser, users);

  async function checkACL(currentUser, users) {

    let allowed_check = "false";
    let denied_check = "false";
    let showComponent = "true";

    if (hideComponent === "false" || hideComponent === false) {
      if (allowedGroups?.length === 0 && deniedGroups?.length === 0) {
        showComponent = true;
      } else if (allowedGroups?.length !== 0 || deniedGroups?.length !== 0) {
        allowedGroups?.forEach((allowedGroup) => {
          users?.forEach((user) => {
            if (user["@name"] === currentUser?.login) {
              Object.values(user.groups).forEach((group) => {
                if (group === allowedGroup) {
                  allowed_check = "true";
                }
              });
            }
          });
        });

        deniedGroups?.forEach((deniedGroup) => {
          users?.forEach((user) => {
            if (user["@name"] === currentUser?.login) {
              Object.values(user.groups).forEach((group) => {
                if (group === deniedGroup) {
                  denied_check = "true";
                }
              });
            }
          });
        });

        if (denied_check === "true" && allowed_check === "false") {
          showComponent = false;
        } else if (allowed_check === "true") {
          showComponent = true;
        } else if (allowedGroups.length !== 0 && allowed_check === "false") {
          showComponent = false;
        } else if (allowed_check === "false") {
          showComponent = true;
        }
      }
    } else {
      showComponent = false;
    }
    return showComponent;
  }
}
