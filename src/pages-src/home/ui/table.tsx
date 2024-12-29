import { dateFormatClient } from "@/src/shared/lib/date";
import {
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  TextField,
} from "@mui/material";
import moment from "moment";
import { FC } from "react";
import { useBloggerPosts } from "../api/use-table";
import { useFilter } from "../modal/store";

interface Metrics {
  views: number;
}

interface BloggerTitle {
  name: string;
}

interface PlatformTitle {
  name: string;
}

interface BloggerPost {
  id: number;
  published_at: string;
  blogger_title?: BloggerTitle;
  platform_title?: PlatformTitle;
  url: string;
  metrics?: Metrics;
}


export const TableElement: FC = () => {
  const { data, isLoading } = useBloggerPosts();
  const setSearch = useFilter((state) => state.setSearch);

  return (
    <>
      <TextField
        fullWidth
        placeholder="Поиск по ссылке..."
        sx={{ mb: 2 }}
        onChange={(e) => setSearch(e.target.value)}
      />
      {isLoading && <LinearProgress />}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Дата публикации</TableCell>
              <TableCell>Блогер</TableCell>
              <TableCell>Сеть</TableCell>
              <TableCell>Ссылка на пост/публ</TableCell>
              <TableCell>Время публикации</TableCell>
              <TableCell>Просмотры</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((row: BloggerPost) => (
              <TableRow key={row.id}>
                <TableCell>
                  {moment(row.published_at).format(dateFormatClient)}
                </TableCell>
                <TableCell>{row.blogger_title?.name}</TableCell>
                <TableCell>{row.platform_title?.name}</TableCell>
                <TableCell>
                  <Tooltip title="Перейти по ссылке">
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        maxWidth: "200px",
                        display: "inline-block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.url}
                    </a>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {moment(row.published_at).format(`HH:mm`)}
                </TableCell>
                <TableCell>{row.metrics?.views}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
