import TravellersStories from "@/src/components/TravellersStories/TravellersStories";

export default function Default() {
  return (
    <TravellersStories
      key="saved-default"
      sort="new"
      pageType="stories"
      buttonType="loadMore"
      mode="mySavedStories"
    />
  );
}
