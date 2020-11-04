import React, { useState, useContext } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Col,
  Row,
  Spinner, Input, FormGroup, Label,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { CredsContext } from '../../../context/Context';

const LeaveApplicationApprovalStaff = React.memo(({
  selectedApplicationData,handleEditSupervisorComments,isReady,selectedApplication,
  handleShowSupervisorComments,selectedApproval,hideSupervisorComments,handleSupervisorCommentsChange,
  isEdit,supervisorComments,handleSaveSupervisorComments,
  ...props}) => {
  
  const { accessLevel, empCode } = useContext(CredsContext)

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleAction = () => setDropdownOpen(prevState => !prevState);
  
  return (
    <React.Fragment>
      {selectedApplicationData.immediate_supervisor === empCode ?
        <React.Fragment>
          <div className="float-right mb-3 ml-2">
            {selectedApplicationData.supervisor_commentL1 || selectedApplicationData.supervisor_commentL2 ?
              <Button color="secondary" onClick={handleEditSupervisorComments}
                disabled={!isReady || selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
              >
                EDIT SUPERVISOR COMMENTS
              </Button>
              :
              <Button color="secondary" onClick={handleShowSupervisorComments}
                disabled={!isReady || selectedApplication.status === "APPROVED" || selectedApplication.status === "DENIED" || selectedApproval.status === "DENIED" || selectedApproval.status === "APPROVED"}
              >ADD SUPERVISOR COMMENTS</Button>
            }
          </div>
        </React.Fragment>
        : ""
      }
      {accessLevel === 1 || empCode === selectedApplicationData.immediate_supervisor ?
        <div style={{ paddingBottom: 10, paddingTop: 10 }} hidden={hideSupervisorComments}>
          <FormGroup>
            <Label>
              Supervisor Commentsa asdasdasd: <span style={{ color: "red" }}>*</span>
            </Label>
            <Input
              bsSize="sm"
              type="textarea"
              onBlur={handleSupervisorCommentsChange}
              rows="4"
              maxLength="200"
              defaultValue={isEdit ? supervisorComments : ""}
            />
          </FormGroup>
          <div style={{ marginTop: 4 }}>
            <Button color="primary" onClick={handleSaveSupervisorComments} style={{ marginRight: "4px" }}>SUBMIT</Button>
            <Button color="secondary" onClick={handleShowSupervisorComments}>CANCEL</Button>
          </div>
        </div>

        : ""
      }
    </React.Fragment>
  );
});

export default LeaveApplicationApprovalStaff;
