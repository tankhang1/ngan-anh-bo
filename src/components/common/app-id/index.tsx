import React, { useMemo } from "react";
type TAppId = {
  id: string | number;
};
function AppId({ id }: TAppId) {
  const convertId = useMemo(() => id.toString(), [id]);
  if (convertId.length > 7)
    return (
      <span>
        {convertId.slice(0, 3)}..{convertId.slice(-3)}
      </span>
    );
  return <span>{convertId}</span>;
}

export default AppId;
