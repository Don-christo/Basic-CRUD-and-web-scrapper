import fs from "fs";
import path from "path";
import http, { IncomingMessage, Server, ServerResponse } from "http";

interface Organisations {
  organization: string;
  createdAt: string;
  updatedAt: string;
  products: string[];
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  id: number;
  noOfEmployees: number;
  employees: string[];
}

// ================= ADD DATA =================

export const createData = (req: IncomingMessage, res: ServerResponse) => {
  let datas = "";

  req.on("data", (chunk) => {
    datas += chunk;
  });
  req.on("end", () => {
    let databaseFolder = path.join(__dirname, "database");
    let databaseFile = path.join(databaseFolder, "database.json");

    // ============ create database dynamically ============

    if (!fs.existsSync(databaseFolder)) {
      fs.mkdirSync(databaseFolder);
    }
    if (!fs.existsSync(databaseFile)) {
      fs.writeFileSync(databaseFile, " ");
    }

    const work = JSON.parse(datas);
    console.log(work);
    return fs.readFile(
      path.join(__dirname, "database/database.json"),
      "utf-8",
      (err, infos) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: false,
              error: err,
            })
          );
        } else {
          let organisation: Organisations[] = [];

          try {
            organisation = JSON.parse(infos);
          } catch (parseError) {
            organisation = [];
          }

          work.createdAt = new Date();
          work.updatedAt = new Date();
          work.noOfEmployees = work.employees.length;

          if (organisation.length === 0) {
            work.id = 1;
          } else {
            let Ids = organisation.map((a) => a.id);
            let newId = Math.max(...Ids);
            work.id = newId + 1;
          }
          organisation.push(work);

          // write back into database
          fs.writeFile(
            path.join(__dirname, "database/database.json"),
            JSON.stringify(organisation, null, 2),
            (err) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    success: false,
                    error: err,
                  })
                );
              } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    success: true,
                    message: organisation,
                  })
                );
              }
            }
          );
        }
      }
    );
  });
};

// ================= GET ALL DATA =================

export const fetchAllData = (req: IncomingMessage, res: ServerResponse) => {
  return fs.readFile(
    path.join(__dirname, "database/database.json"),
    "utf-8",
    (err, info) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            error: err,
          })
        );
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: true,
            data: JSON.parse(info),
          })
        );
      }
    }
  );
};

// ================= UPDATE DATA =================

export const updateData = (req: IncomingMessage, res: ServerResponse) => {
  let datas = "";

  req.on("data", (chunk) => {
    datas += chunk;
  });
  req.on("end", () => {
    let work = JSON.parse(datas);

    return fs.readFile(
      path.join(__dirname, "database/database.json"),
      "utf8",
      (err, info) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: false,
              error: err,
            })
          );
        } else {
          let organisation: Organisations[] = JSON.parse(info);
          let fetchedDataIndex = organisation.findIndex(
            (a) => a.id === work.id
          );
          organisation[fetchedDataIndex] = work;

          fs.writeFile(
            path.join(__dirname, "database/database.json"),
            JSON.stringify(organisation, null, 2),
            (err) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    success: false,
                    error: err,
                  })
                );
              } else {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({
                    success: true,
                    message: organisation,
                  })
                );
              }
            }
          );
        }
      }
    );
  });
};

// ================= DELETE DATA =================

export const deleteData = (req: IncomingMessage, res: ServerResponse) => {
  let datas = "";

  req.on("data", (chunk) => {
      datas += chunk;
  })
  req.on("end", () => {
      let work = JSON.parse(datas);

      return fs.readFile(path.join(__dirname, "./database/database.json"), "utf8", (err, info) => {
          if(err) {
              res.writeHead(500, {"Content-Type": "application/json"});
              res.end(JSON.stringify({
                  success: false,
                  error: err
              }))
          }else {
              let organisation: Organisations[] = JSON.parse(info);
              let fetchedDataIndex = organisation.findIndex((a) => a.id === work.id);
              let deleteData: any = organisation.find((a)=> a.id = work.id)
              organisation.splice(fetchedDataIndex, 1);
              fs.writeFile(path.join(__dirname, "./database/database.json"), JSON.stringify(organisation, null, 2), (err) => {
                  if(err) {
                      res.writeHead(500, {"Content-Type": "application/json"});
                      res.end(JSON.stringify({
                          success: false,
                          error: err
                      }))
                  }else {
                      res.writeHead(200, {"Content-Type": "application/json"});
                      res.end(
                          JSON.stringify({
                              success: true,
                              message: organisation
                          })
                      )
                  }
              })
          }
      })
  })
}