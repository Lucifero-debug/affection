import { sections } from "./content";
import Overture from "./components/Overture";
import Cursor from "./components/Cursor";
import TapHearts from "./components/TapHearts";
import ScrollProgress from "./components/ScrollProgress";
import ChapterRail from "./components/ChapterRail";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Statement from "./components/Statement";
import Confession from "./components/Confession";
import Ornament from "./components/Ornament";
import Timeline from "./components/Timeline";
import Reel from "./components/Reel";
import Facts from "./components/Facts";
import Heartline from "./components/Heartline";
import ReasonsDeck from "./components/ReasonsDeck";
import InEveryLanguage from "./components/InEveryLanguage";
import Gallery from "./components/Gallery";
import Since from "./components/Since";
import Letter from "./components/Letter";
import Drafts from "./components/Drafts";
import OpenWhen from "./components/OpenWhen";
import Promises from "./components/Promises";
import HoldMe from "./components/HoldMe";
import TheQuestion from "./components/TheQuestion";
import Finale from "./components/Finale";
import MusicPlayer from "./components/MusicPlayer";

export default function Page() {
  return (
    <>
      <Overture />
      <ScrollProgress />
      <ChapterRail />
      <Cursor />
      <TapHearts />

      <main className="relative">
        {/* her name → the ribbon */}
        <Hero />
        <Marquee />

        {/* I — why this exists at all */}
        <Statement />

        {/* the sentences that never made it out */}
        <Confession />

        {/* II — my side of the story */}
        <Ornament className="bg-cream pt-4" />
        <Timeline />

        {/* the reel — the one place she moves. off until a clip exists */}
        {sections.reel && <Reel />}

        {/* III — what I've noticed */}
        <Facts />

        {/* what she does to a resting heart rate */}
        <Heartline />

        {/* IV — the deck of reasons */}
        <ReasonsDeck />

        {/* the same sentence, sixteen ways */}
        <InEveryLanguage />

        {/* the photographs — off unless these are pictures you legitimately have */}
        {sections.gallery && <Gallery />}

        {/* how long this has been sitting unsaid */}
        {sections.counter && <Since />}

        {/* V — the letter. the one that matters */}
        <Letter />

        {/* the three weeks, shown rather than described */}
        <Drafts />

        {/* VI — notes for while she decides */}
        <OpenWhen />

        {/* VII — what I'd be bringing, if */}
        <Promises />

        {/* the one she has to hold down */}
        <HoldMe />

        {/* the ask — both answers real */}
        <Ornament className="pb-4" />
        <TheQuestion />

        <Finale />
      </main>

      <MusicPlayer />
    </>
  );
}
