function StarRating({
  rating,
  onRatingChange,
  editable = false,
}) {
  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: editable
              ? "pointer"
              : "default",
            fontSize: "23px",
            color:"white"
          }}
          onClick={() =>
            editable &&
            onRatingChange(star)
          }
        >
          {star <= rating ? "⭐" : "☆"}
        </span>
      ))}
    </>
  );
}

export default StarRating;