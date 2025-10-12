import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const AITextAssistDialog = ({ open, suggestion, onClose, onAccept, onChange }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>AI Suggestion</DialogTitle>
      <DialogContent>
        <TextField
          multiline
          minRows={4}
          fullWidth
          value={suggestion}
          onChange={(e) => onChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Discard</Button>
        <Button onClick={onAccept} variant="contained">Accept</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AITextAssistDialog;
