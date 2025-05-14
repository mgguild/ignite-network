import AboutUs from "./about_us/AboutUs";
import Explore from "./explore/Explore";
import Networks from "./networks/Networks";
import Resources from "./resources/Resources";
import Stats from "./stats/Stats";

export default function Hero() {
  return (
    <>
      <div id="explore">
        <Explore />
      </div>
      <div id="networks">
        <Networks />
      </div>
      <div id="stats">
        <Stats />
      </div>
      <div id="resources">
        <Resources />
      </div>
      <div id="about_us">
        <AboutUs />
      </div>
    </>
  )
}
