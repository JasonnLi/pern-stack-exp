import * as React from "react";
import { Table, Button } from "antd";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import { userLogout } from "../actions/authActions";
import { Link } from "react-router-dom";
import { BarChartOutlined, UserOutlined } from "@ant-design/icons";

function PlaysPage(props: any) {
  const [plays, setPlays] = React.useState(null);

  React.useEffect(() => {
    const data = [{
      Dataline: 1,
      Play: "King Lear",
      PlayerLinenumber: 1,
      ActSceneLine: "1.1",
      Player: "William",
      PlayerLine: "Hello, welcome to this page"
    }]
    setPlays(data)
  }, []);

  const onLogout = () => {
    // e.preventDefault()
    props.userLogout();
  };

  return (
    <div id="home-table" style={{ padding: 24 }}>
      <h2 className="title">Shakepeare Plays</h2>
      <Table
        pagination={{ pageSize: 50 }}
        dataSource={plays}
        scroll={{ y: 500 }}
        rowKey={"id"}
        columns={[
          { dataIndex: "Dataline", title: "Dataline" },
          { dataIndex: "Play", title: "Play" },
          { dataIndex: "PlayerLinenumber", title: "Player Line Number" },
          { dataIndex: "ActSceneLine", title: "Act Scene Line" },
          { dataIndex: "Player", title: "Player" },
          { dataIndex: "PlayerLine", title: "PlayerLine" },
          {
            title: "Edit",
            render: (text, record) => (
              <span>
                <Link to={"/plays"}>Edit</Link>
                <span id="act-divider"> | </span>
                <a
                  href={"/plays"}
                >
                  Delete
                </a>
              </span>
            ),
          },
        ]}
      />
      <div className="vis-login-btn-container">
        <Link to="/plays/dashboard">
          <Button
            className="common-setting-btn"
            id="vis-btn"
            type="default"
            icon={<BarChartOutlined />}
          >
            Dashboard
          </Button>
        </Link>
        <Link to="/plays/login">
          {props.auth.isAuthenticated === false ? (
            <Button
              className="common-setting-btn"
              id="login-btn"
              type="primary"
              icon={<UserOutlined />}
            >
              Login
            </Button>
          ) : (
            <Button
              className="common-setting-btn"
              id="logout-btn"
              type="primary"
              icon={<UserOutlined />}
              onClick={onLogout}
            >
              Logout
            </Button>
          )}
        </Link>
      </div>
    </div>
  );
}

PlaysPage.propTypes = {
  userLogout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state: { auth: any }) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { userLogout })(PlaysPage);

// Using link will not completely reload the page. However, using <a> with href will make the whole page refresh
// Tested by observing the change of the state status, the state will go back to original if use <a href>
// e.g. in delete button, it use <a> to help refresh page to update content after delete record
