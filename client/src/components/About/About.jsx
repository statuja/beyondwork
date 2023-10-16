import React from "react";
import logo1 from "../../images/avatar1.png";
import logo2 from "../../images/avatar2.png";
import logo3 from "../../images/avatar3.png";
import logo4 from "../../images/avatar4.jpg";

function About() {
  return (
    <div>
      <h1>About Beyond Work</h1>
      <h2>
        Welcome to Beyond Work, the digital haven where work and play converge.
        We understand that work is just one facet of a fulfilling life, and
        that's why we've created this space - to foster a vibrant, engaging, and
        well-rounded employee community.
      </h2>
      <h3>Our Mission</h3>
      <p>
        At Beyond Work, our mission is to strengthen workplace bonds, spark
        creativity, and promote a healthy work-life balance. We believe that
        when employees are encouraged to connect, collaborate, and explore
        shared interests beyond the office, the result is a more motivated,
        inspired, and satisfied workforce.
      </p>
      <h3>What We Offer</h3>
      <ul>
        <li>
          <h4>Connect: </h4>
          <p>
            Beyond Work provides a platform for employees to connect on a
            personal level. Here, you can chat with colleagues, share hobbies,
            and discover common interests that transcend the confines of the
            workplace.
          </p>
        </li>
        <li>
          <h4>Create: </h4>
          <p>
            We're all about encouraging creativity. Whether it's through
            writing, art, music, or other passions, you'll find a space to
            showcase your talents and collaborate with like-minded colleagues.
          </p>
        </li>
        <li>
          <h4>Celebrate: </h4>
          <p>
            Work should be celebrated, and so should life's other achievements.
            Join us in recognizing and honoring the incredible accomplishments
            of our employees, both professionally and personally.
          </p>
        </li>
        <li>
          <h4>Escape: </h4>
          <p>
            Sometimes, you just need a break. Beyond Work offers an escape from
            the daily grind. Explore topics that intrigue you, share a laugh, or
            simply unwind in the company of your peers.
          </p>
        </li>
      </ul>
      <h3>Who We Are</h3>
      <p>
        Beyond Work is more than just a website; it's a community driven by our
        dedicated team. We're passionate about creating a positive work
        environment, and we're committed to supporting your journey toward a
        more balanced and enriching work-life experience.
      </p>
      <h3>Join Us Today</h3>
      <p>
        We invite you to be a part of Beyond Work. Together, we'll build a
        thriving, engaging community where work doesn't have to end when the
        clock strikes five. Explore, connect, and discover the many facets of
        your colleagues, and let's make every aspect of work and life a
        memorable adventure.
      </p>
      <div id="meet-the-developers">
        <h2>Meet the Developers</h2>
        <p>
          At Beyond Work, our digital haven is the result of hard work and
          dedication from a passionate team of developers who believe in the
          power of community, creativity, and work-life balance. Allow us to
          introduce the minds behind the platform:
        </p>
        <div id="developer-card">
          <img
            className="developer-img"
            src={logo1}
            alt="developer and co-founder img"
            style={{
              borderRadius: "50%",
              height: 150,
              width: 150,
            }}
          ></img>
          <h5>Marwah D</h5>
          <h6>Co-founder & Lead Developer</h6>
          <p>
            Marwah, a co-founder of Beyond Work, is our visionary leader, adept
            at transforming concepts into tangible solutions. With a wealth of
            expertise in both frontend and backend development, Marwah is the
            driving force behind Beyond Work's innovative features and
            functionalities
          </p>
        </div>
        <div id="developer-card">
          <img
            className="developer-img"
            src={logo2}
            alt="developer and co-founder img"
            style={{
              borderRadius: "50%",
              height: 150,
              width: 150,
            }}
          ></img>
          <h5>Iryna Khartanovich</h5>
          <h6>Co-founder & Backend Magician</h6>
          <p>
            Iryna is the technical backbone of our platform. As a Fullstack
            developer, her mastery of both frontend and backend development
            ensures a smooth and secure user experience. She plays a pivotal
            role in maintaining the efficiency and reliability of Beyond Work.
          </p>
        </div>
        <div id="developer-card">
          <img
            className="developer-img"
            src={logo3}
            alt="developer and co-founder img"
            style={{
              borderRadius: "50%",
              height: 150,
              width: 150,
            }}
          ></img>
          <h5>Elena Armaroli</h5>
          <h6>Co-founder & Lead Developer</h6>
          <p>
            Elena is our frontend and backend magician. Her prowess in
            developing user-friendly interfaces and ensuring data integrity
            makes Beyond Work a pleasure to navigate. Elena is dedicated to
            delivering a seamless and visually appealing platform.
          </p>
        </div>
        <div id="developer-card">
          <img
            className="developer-img"
            src={logo4}
            alt="developer and co-founder img"
            style={{
              borderRadius: "50%",
              height: 150,
              width: 150,
            }}
          ></img>
          <h5>Netta Barel</h5>
          <h6>Co-founder & Lead Developer</h6>
          <p>
            Netta is our dynamic Fullstack developer and community manager,
            ensuring the heart of Beyond Work beats with energy. She's the
            driving force behind engaging discussions and fresh content,
            fostering a supportive and enjoyable user experience.
          </p>
        </div>
      </div>
      <h2>Get in Touch</h2>
      <p>
        We're thrilled to have you join us on the Beyond Work journey. Whether
        you have ideas, feedback, or simply want to say hello, don't hesitate to
        reach out to our talented team. We're here to make Beyond Work the best
        it can be for you!
      </p>
    </div>
  );
}

export default About;
