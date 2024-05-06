import React from "react";
import "../styles/styles-pages/About.css";

function AboutPage() {
  return (
    <div className="page-wrapper about-page-wrapper">
      <div className="about-info-wrapper">
        {/* INTRODUCTION / ABSTRACT */}
        <h1 className="about-headline">Open Storage</h1>
        <p className="about-description-text">
          Open Storage is a platform that connects artists and art lovers.{" "}
          <span className="highlight">Our vision</span> is to enable everyone to
          live with original art from their local creative scene.
        </p>

        {/* HELP / SUSTAINABLE */}
        <section className="about-section-sustainable">
          <div className="about-icon-wrapper">
            <img src="/img/about-sustainable.png" alt="" />
          </div>
          <p className="about-description-text">
            On one hand, we want to{" "}
            <span className="highlight">help artists</span> get their work out
            into the world and minimise their storage needs. On the other hand,
            we want to <span className="highlight">help you</span>, weather you
            are an artist or art lover, to lower the hurdle of living with art
            in your everyday life. It is Important for us to find{" "}
            <span className="highlight">sustainable solutions</span> of sharing
            art in local communities and minimize the needs for
            ressource-intensive packaging and transportation.
          </p>
        </section>

        {/* WHO ARE WE? */}
        <section className="about-section-we">
          <div className="about-icon-wrapper">
            <img src="/img/about-idea.png" alt="" />
          </div>
          <p className="about-description-text">
            The idea for Open Storage arose from our own needs and experiences
            as artists and art lovers. We have been working in the art sector
            ourselves for several years. In doing so, we realized that we
            ourselves, as well as many of our friends, create wonderful works
            that rarely see the light of day. At the same time, we are not only
            artists but also art lovers and, like most people around us, we can
            rarely afford to buy one of these wonderful works and make it part
            of our everyday lives. With Open Storage, we want to take these
            shortfalls and needs as an opportunity and bring them together in a
            productive and sustainable way.
          </p>
        </section>

        {/* OUR TARGET GROUP */}
        <section className="about-section-targetgroup">
          <div className="about-icon-wrapper">
            <img src="/img/about-targetgroup.png" alt="" />
          </div>
          <p className="about-description-text">
            With Open Storage, we are targeting artists who are not among the 1%
            of the most successful protagonists in the art world and people with
            a low to average income who would like to have art around them but
            can rarely afford it. Open Storage also offers many other
            advantages: The platform offers a secondary source of income for
            artists. As an art lover, you can directly support your favorite
            artists in your area financially and help them to continue working
            as artists. At the same time, you are flexible: you can rent a work
            for a certain period of time and then exchange it for another one at
            any time.
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
