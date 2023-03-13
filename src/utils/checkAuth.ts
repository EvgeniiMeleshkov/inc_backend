import {Response, Request} from 'express';
import {btoa} from 'buffer';


export default function (req: Request, res: Response, next: any) {
  const isAdmin ='Basic ' + btoa('admin/qwerty')
  if(req.headers.authorization === isAdmin) {
    next()
  } else {
    res.sendStatus(401)
  }
}