PROTO_DIR=pkg/api/proto
PB_DIR=pkg/api/pb

proto:
	protoc --go_out=${PB_DIR} --go-grpc_out=${PB_DIR} ${PROTO_DIR}/squad-service.proto

clean:
	rm -f ${PB_DIR}/*.pb.go

.PHONY: proto clean
