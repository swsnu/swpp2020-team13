import React from "react";
import { Card, Icon, Button } from "semantic-ui-react";

export default class GoalCard extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content header={"Test Goal Card"} textAlign="center" />
        <Card.Content
          style={{
            height: "200px",
            backgroundImage: `url(https://cdn.pixabay.com/photo/2017/05/13/15/18/dear-2309801_1280.jpg)`,
            backgroundSize: "cover",
          }}
        >
          <Card.Description style={{ color: "white" }}>
            Hello World!
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button floated="right" fluid>
            Click for Details
          </Button>
        </Card.Content>
      </Card>
    );
  }
}
