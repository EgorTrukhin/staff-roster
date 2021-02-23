import React from 'react';
import './worker-info.css';

import FormButton from '../form-button';
import EditDelButtons from '../edit-n-del-buttons';

export default class WorkerInfo extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="modal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <EditDelButtons />
              <div>
                <FormButton
                  label="Close"
                  type="button"
                  css="btn-secondary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
