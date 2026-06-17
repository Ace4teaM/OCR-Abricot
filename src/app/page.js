import styles from "./page.module.css";
import {IAButton, ChipButton, MenuItemButton, IconButton, Button} from "@/components/Buttons";
import {TagLabel} from "@/components/Labels";
import {ProjectCard} from "@/components/Cards";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <IAButton></IAButton>
        </div>
        <div>
          <ChipButton>Personnalisé</ChipButton>
          <ChipButton type="task">Mes tâches</ChipButton>
          <ChipButton type="kaban">Kaban</ChipButton>
          <ChipButton type="project">Mes projets</ChipButton>
        </div>
        <div>
          <IconButton iconName="<-"></IconButton>
          <IconButton iconName="..."></IconButton>
        </div>
        <div>
          <MenuItemButton></MenuItemButton>
          <MenuItemButton iconName="project">Projets</MenuItemButton>
        </div>
        <div>
          <Button>Button label</Button>
          <Button disabled={true}>Button label</Button>
        </div>
        <div>
          <TagLabel color="green"></TagLabel>
          <TagLabel color="orange"></TagLabel>
          <TagLabel color="red"></TagLabel>
          <TagLabel color="yellow"></TagLabel>
          <TagLabel color="blue"></TagLabel>
          <TagLabel color="gray"></TagLabel>
        </div>
        <ProjectCard></ProjectCard>
      </main>
    </div>
  );
}
