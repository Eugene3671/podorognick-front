import { Story } from "@/src/types/story";
import Image from "next/image";

interface StoryDetailsProps {
  story: Story;
}
export const StoryDetails = ({ story }: StoryDetailsProps) => {
  if (typeof story.category === "string" || typeof story.ownerId === "string")
    return <div>Помилка під час завантаженя</div>;
  return (
    <>
      <div>
        <div>
          <p>
            <strong>Автор статті:{story.ownerId.name}</strong>
          </p>
          <p>
            <strong>Опубліковано:{story.date}</strong>
          </p>
        </div>
        <p>{story.category.name}</p>
      </div>
      <div>
        <Image
          src={story.img}
          alt="story"
          width={335}
          height={223}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div>
        <p>{story.article}</p>
        <div>
          <p>Збережіть собі історію</p>
          <p>Вона буде доступна у вашому профілі у розділі збережене</p>
          <button type="button"> Зберегти aбо видали</button>
        </div>
      </div>
    </>
  );
};
