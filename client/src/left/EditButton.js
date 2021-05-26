import React, { useCallback, useState } from "react";
import { Button } from "@material-ui/core";

import EditFields from "./EditFields";

function EditButton({ userInfo }) {
  const [editPanel, setEditPanel] = useState(false);

  const toggleEdit = useCallback((e) => {
    setEditPanel((editPanel) => !editPanel);
  }, []);

  return (
    <div>
      <div>
        <Button type="submit" onClick={toggleEdit} className="edit-btn">
          Edit Profile
        </Button>
      </div>
      {editPanel ? (
        <>
          <EditFields
            className="edit-input"
            userInfo={userInfo}
            field={"pfp"}
          />
          <EditFields
            className="edit-input"
            userInfo={userInfo}
            field={"bio"}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default EditButton;
