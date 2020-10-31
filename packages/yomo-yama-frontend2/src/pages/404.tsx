import React from "react"
import { graphql } from "gatsby"
import Navbar from "../components/navbar/navbar"
import ResetCss from "../components/reset-css"
import SEO from "../components/seo"
import NotFound from "../containers/not-found"
import Footer from "../components/footer/footer"

const NotFoundPage = (): JSX.Element => {
  return (
    <>
      <ResetCss />
      <Navbar />
      <SEO title="404: Not Found" />
      <NotFound />
      <Footer>
        Copyright &copy; {new Date().getFullYear()}
        <a href="https://redq.io/"> RedQ, Inc.</a>
      </Footer>
    </>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`