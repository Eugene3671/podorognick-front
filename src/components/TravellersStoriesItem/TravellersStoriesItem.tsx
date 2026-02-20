import Image from "next/image";
import Link from "next/link";
import css from "./TravellersStoriesItem.module.css";

interface TravellersStoriesItemProps {
  category: Category;
  story: Story;
  user: User;
}
export default function TravellersStoriesItem({
  category,
  story,
  user,
}: TravellersStoriesItemProps) {
  return (
    <div className={css.travellerStoryItem}>
      <Image
        src={story.img}
        alt="placeholder"
        width={421}
        height={280}
        className={css.storyThumbnail}
      />
      <div className={css.storyWrapper}>
        <div className={css.storyContents}>
          <p className={css.regionTag}>{category.name}</p>
          <h4 className={css.storyTitle}>{story.title}</h4>
          <p className={css.storyText}>{story.article}</p>
        </div>
        <div className={css.storyAuthor}>
          <Image
            src={user.avatarUrl}
            alt="avatar"
            width={54}
            height={54}
            className={css.authorAvatar}
          />
          <div className={css.authorInfo}>
            <p className={css.authorName}>{user.name}</p>
            <div className={css.storyInfo}>
              <p className={css.storyDate}>{story.date}</p>
              <span className={css.separator}>•</span>
              <p className={css.numberOfSaves}>{story.favoriteCount}</p>
            </div>
          </div>
        </div>
        <Link href="/stories/[storyId]" className={css.storyDetailsLink}>
          Переглянути статтю
        </Link>
        <button className={css.saveButton}>Save</button>
      </div>
    </div>
  );
}
