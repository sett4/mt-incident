import React from "react"
import { Link, graphql } from "gatsby"
import * as PropTypes from "prop-types"
import Img from "gatsby-image"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import withStyles, {
  WithStyles,
  StyleRules,
} from "@material-ui/core/styles/withStyles"
import createStyles from "@material-ui/core/styles/createStyles"
import Typography from "@material-ui/core/Typography"
import moment, { months } from "moment"
import { Helmet } from "react-helmet"
import withRoot from "../withRoot"
import { Divider, Paper } from "@material-ui/core";
import IncidentMonthlyFragment from "../components/IncidentMonthlyFragment";

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
}

interface IncidentIndexProps extends WithStyles<typeof styles> {
  classes: any
  data: {
    incident: {
      edges: [
        {
          node: {
            id: string
            source: string
            author: string
            sourceName: string
            url: string
            title: string
            content: string
            date: string
            publishedDate: string
          }
        }
      ]
    },
    month: {
      edges: [
        { 
          node: {
            month: string
            started: Date
            ended: Date
          }
        }
      ]
    }
  }
}

const Incident = ({ node, classes }: any) => (
  <ListItem>
    <Link
      style={{ color: `inherit`, textDecoration: `none` }}
      to={`/incident/${node.id}/`}
    >
      <ListItemText
        primary={moment(node.date).format("YYYY-MM-DD") + " " + node.title}
        secondary={
          <React.Fragment>
            <Typography component="span" color="textSecondary">
              {node.sourceName}
            </Typography>
            {/* {node.content} */}
          </React.Fragment>
        }
      />
    </Link>
  </ListItem>
)

class IncidentIndexPage extends React.PureComponent<IncidentIndexProps> {
  constructor(props: IncidentIndexProps) {
    super(props)
  }
  render() {
    const incidentEdges = this.props.data.incident.edges
    const monthList = this.props.data.month
    const classes = this.props.classes
    return (
      <Layout>
        <Helmet>
          <title>Mountain Incidents</title>
        </Helmet>
        <Paper style={{ padding: rhythm(1), margin: rhythm(0.4) }}>
          <Typography variant="h2" component="h2">Mountain Incidents</Typography>
          <List>
            {incidentEdges.map(({ node }, i) => (
              <Incident node={node} classes={classes} key={node.id} />
            ))}
          </List>
        </Paper>

        <IncidentMonthlyFragment month={monthList} classes={classes} />
      </Layout>
    )
  }
}

export default withRoot(withStyles(styles)(IncidentIndexPage))

export const pageQuery = graphql`
  query {
    incident: allIncident(
      limit: 50
      filter: { tags: { in: "山岳事故" } }
      sort: { fields: [date, publishedDate], order: DESC }
    ) {
      edges {
        node {
          id
          title
          url
          date
          publishedDate
          tags
          content
          source
          sourceName
        }
      }
    }
    month: allIncidentMonthly(sort: { fields: [month], order: [DESC]}) {
      edges {
        node {
          id
          month
          started
          ended
        }
      }
    }
  }
`
