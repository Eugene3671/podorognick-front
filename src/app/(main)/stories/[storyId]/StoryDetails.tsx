import { Story } from "@/src/types/story";
import Image from "next/image";
import css from "./StoryDetails.module.css";
import { formatDate } from "@/src/utils/formatDate";
interface StoryDetailsProps {
  story: Story;
}
export const StoryDetails = ({ story }: StoryDetailsProps) => {
  if (typeof story.category === "string" || typeof story.ownerId === "string")
    return <div>Помилка під час завантаженя</div>;
  return (
    <>
      <div className={css.storyInfo}>
        <p className={css.storyInfoTitle}>
          <strong>Автор статті </strong>
          {story.ownerId.name ?? "Невідомий автор"}
        </p>
        <p className={css.storyInfoTitle}>
          <strong>Опубліковано </strong>
          {formatDate(story.date)}
        </p>
        <p className={css.storyInfoCategory}>
          {story.category.name ?? "Без категорії"}
        </p>
      </div>
      <div className={css.storyImageWrapper}>
        <Image src={story.img} alt="story" fill className={css.storyImage} />
      </div>
      <div className={css.storyArticleWrapper}>
        <p className={css.storyArticle}>{story.article}</p>
        <div className={css.addToSaveWrapper}>
          <p className={css.addToSaveTitle}>Збережіть собі історію</p>
          <p className={css.addToSaveDescr}>
            Вона буде доступна у вашому профілі у розділі збережене
          </p>
          <button className={`buttonBlue ${css.addToSaveBtn}`} type="button">
            {" "}
            Зберегти aбо видали
          </button>
        </div>
      </div>
    </>
  );
};
