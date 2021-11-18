import { Card, CardHeader, Alert } from "@mui/material";

export default function AppCurrentSubject({ data }) {
  return (
    <Card>
      <CardHeader title="Current Subject" />
      <h4>Below are the list of breeds fetched from API</h4>
      <Alert severity="info">
        {data.message &&
          Object.keys(data.message).map((breeds, index) => (
            <div key={index}>{breeds}</div>
          ))}
      </Alert>
    </Card>
  );
}
