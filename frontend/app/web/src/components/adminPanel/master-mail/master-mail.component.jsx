import React from "react";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { connect } from "react-redux";
import { selectMailsFromDB } from "../../../redux/masterMail/masterMail.selector";
import { createStructuredSelector } from "reselect";

const MasterMailComponent = (props) => {
  const openMail = (mailId) => {
    console.log(mailId);
    props.history.push("mailDetail/" + mailId);
  };
  return (
    <div>
      {props.mails
        ? props.mails.map((mail) => {
            const months = [
              "JAN",
              "FEB",
              "MAR",
              "APR",
              "MAY",
              "JUN",
              "JUL",
              "AUG",
              "SEP",
              "OCT",
              "NOV",
              "DEC",
            ];

            let date =
              new Date(mail.mailDateTime).getDate() +
              " " +
              months[new Date(mail.mailDateTime).getMonth()] +
              "," +
              new Date(mail.mailDateTime).getFullYear();
            return (
              <div
                onClick={() => openMail(mail._id)}
                className="singleMailView"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                  borderBottom: "solid 1px rgba(0,0,0,.2)",
                  height: "90px",
                  padding: "10px",
                  borderRadius: "6px",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <AvatarGroup max={4}>
                      {mail.mailTo
                        .replace(" ", "")
                        .split(";")
                        .map((avatar) => {
                          return (
                            <Avatar style={{ backgroundColor: "#ff008b" }}>
                              {avatar.charAt(0)}
                            </Avatar>
                          );
                        })}
                    </AvatarGroup>
                    <span style={{ marginTop: "10px", marginLeft: "10px" }}>
                      {mail.mailTo}
                    </span>
                  </div>
                  <div>{date}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  {mail.subject}
                </div>
              </div>
            );
          })
        : "Nothing was found"}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  mails: selectMailsFromDB,
});

export default withRouter(connect(mapStateToProps)(MasterMailComponent));
