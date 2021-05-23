import React, { useCallback, useState } from "react";
import { Button } from "@material-ui/core";

import EditFields from "./EditFields";

function EditButton() {
  const [editPanel, setEditPanel] = useState(false);

  const toggleEdit = useCallback(() => {
    setEditPanel((editPanel) => !editPanel);
  }, []);

  return (
    <div>
      <Button onClick={toggleEdit} className="edit-btn">
        Edit Profile
      </Button>
      {editPanel ? <EditFields className="edit-input" /> : ""}
    </div>
  );
}

export default EditButton;
