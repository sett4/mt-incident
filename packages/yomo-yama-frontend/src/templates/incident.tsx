import React from "react"
import { Link, graphql } from "gatsby"
import * as PropTypes from "prop-types"
import Img from "gatsby-image"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  TableBody,
  TableRow,
  Table,
  TableCell,
  Typography,
} from "@material-ui/core"
import moment from "moment"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import withStyles, {
  WithStyles,
  StyleRules,
} from "@material-ui/core/styles/withStyles"
import createStyles from "@material-ui/core/styles/createStyles"
import withRoot from "../withRoot"

const styles = (theme: Theme) => {
  return createStyles({
    paper: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 1,
      paddingBottom: theme.spacing.unit * 1,
    },
    typography: {
      marginTop: theme.spacing.unit * 1,
      marginBottom: theme.spacing.unit * 2,
    },
  })
}

interface IncidentTemplateProps extends WithStyles<typeof styles> {
  data: {
    incident: {
      source: string
      sourceName: string
      url: string
      title: string
      content: string
      date: string
      publishedDate: string
      tags: string[]
      author: string
    }
  }
}

class IncidentTemplate extends React.Component<IncidentTemplateProps> {
  constructor(props: IncidentTemplateProps) {
    super(props)
  }
  render() {
    const incident = this.props.data.incident
    const classes = this.props.classes
    return (
      <Layout>
        <Helmet>
          <title>{incident.title} - Mountain Incident</title>
        </Helmet>
        <div
          style={{
            display: `flex`,
            alignItems: `center`,
          }}
        />
        <h2>{incident.title}</h2>
        <Typography component="p" className={classes.typography}>
          {incident.tags.includes("__private-use")
            ? incident.content.substring(
                0,
                Math.min(64, incident.content.length)
              ) + "(snip)"
            : incident.content}
        </Typography>
        <Paper className={classes.paper} elevation={1}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>source</TableCell>
                <TableCell>
                  <a href={incident.url} ref="noopener">
                    {incident.sourceName}
                  </a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>date</TableCell>
                <TableCell>{moment(incident.date).format()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>published</TableCell>
                <TableCell>{moment(incident.publishedDate).format()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>tags</TableCell>
                <TableCell>
                  {incident.tags.map((tag, i) => (
                    <Typography component="span" key={tag}>
                      {tag}
                    </Typography>
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Layout>
    )
  }
}

export default withRoot(withStyles(styles)(IncidentTemplate))

export const pageQuery = graphql`
  query($id: String!) {
    incident(id: { eq: $id }) {
      title
      url
      content
      source
      sourceName
      date
      publishedDate
      tags
    }
  }
`
